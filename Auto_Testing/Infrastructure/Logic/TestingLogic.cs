using Auto_Testing.Authentication;
using Auto_Testing.Infrastructure.Data.Interface;
using Auto_Testing.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using WindowsInput;

namespace Auto_Testing.Infrastructure.Logic
{
	public class TestingLogic
	{
		private readonly ILogger<TestingLogic> _logger;
		private readonly IS3Data _s3Data;
		private readonly IWebData _webData;
        private readonly HttpClient _client;
		private readonly object _sync;
		public Process gameProcess;

		public TestingLogic(ILogger<TestingLogic> logger, IS3Data s3Data, IWebData webData, CustomJWT jwt)
		{
			_logger = logger;
			_s3Data = s3Data;
			_webData = webData;
			_sync = new object();


            _client = new HttpClient(new HttpClientHandler()
            {
                AllowAutoRedirect = false
            });
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt.CreateJWT());
		}

		public void RunAllEntryTests()
		{
			try
			{
				TestsQueue testsQueue = _webData.GetFirstTestQueue(_client);

				while (testsQueue != null)
				{
					lock (_sync)
					{
						Tests testProcess = new Tests();
						testProcess.GameId = testsQueue.GameId;
						RunSingleEntryTest(testsQueue, testProcess);
					}

					testsQueue = _webData.GetFirstTestQueue(_client);
				}

				SendEmail();
				_webData.StopAutomatedTestingEC2(_client);
			}
			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				SendEmail();
				_webData.StopAutomatedTestingEC2(_client);
			}
		}

		public void SendEmail()
		{
			Email email = new Email()
			{
				To = "knightsarcade@gmail.com",
				From = "noreply@knightsarcade.com",
				Subject = "Automated Testing is completed",
				Body = "Automated tests have finished running"
			};

			_webData.SendEmail(email, _client);
		}

		public void RunSingleEntryTest(TestsQueue testsQueue, Tests testProcess)
		{
			try
			{
				while (testsQueue.RetryCount < 3)
				{
					TestingLog testLog = new TestingLog();

					_webData.PutTestsQueue(testsQueue, _client);

					testLog.TestlogAttempt = (int)testsQueue.RetryCount;
					testLog.GameId = (int)testsQueue.GameId;

					GamesEntry myGame = _webData.GetGamesByID(testsQueue.GameId, _client);

					//Retry to pull game if it failed the first time
					if (myGame == null)
					{
						testProcess.TestOpens = false;
						testProcess.Test5min = false;
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;

						continue;
					}

					string debugKey = "public/" + myGame.GamePath;
					string fileLocation = _s3Data.ReadObjectDataAsync(debugKey).Result;

					//Point variable to folder which contains .exe file
					fileLocation = FindSubDir(fileLocation);

					//Store list of names of files within game folder
					testProcess.TestFolderFileNames = FolderFileNames(fileLocation);

					//Find .exe file path
					string[] exeFiles = FindExe(fileLocation);

					//Store number of exe files within game folder
					testProcess.TestNumExeFiles = exeFiles.Length;

					gameProcess = new Process();

					//start .exe, check to see if it started
					testProcess.TestOpens = StartFile(exeFiles[0]);

					//Retry tests if process does not start
					if (!(bool)testProcess.TestOpens)
					{
						testProcess.Test5min = false;
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;
						testLog.TestlogLog = "Game Failed Start Test";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}

					//Check to see if game still running after 5 min
					testProcess.Test5min = SleepFile(exeFiles[0]);

					//Retry tests if process does not stay open for 5 min
					if ((bool)!testProcess.Test5min)
					{
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;
						testLog.TestlogLog = "Game Failed Sleep Test";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}

					//Store memory usage by game process
					testProcess.TestAverageRam = RamFile();

					//Retry tests if the program is unable to record the game's RAM usage
					if (testProcess.TestAverageRam == null)
					{
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;
						testLog.TestlogLog = "Game Average RAM Test Failed";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}

					//Store memory usage by game process
					testProcess.TestPeakRam = RamFile();

					//Retry tests if the program is unable to record the game's RAM usage
					if (testProcess.TestPeakRam == null)
					{
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;
						testLog.TestlogLog = "Game Peak RAM Test Failed";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}

					//Test whether game will close on "3" key press
					int i = CloseOn3(exeFiles[0]);

					if (i == 0)
						testProcess.TestCloseOn3 = true;

					else if (i == 1)
						testProcess.TestCloseOn3 = false;

					//Retry tests if the program is unable to restart after passing "3" test
					else if (i == 2)
					{
						testProcess.TestOpens = false;
						testProcess.Test5min = false;
						testProcess.TestAverageRam = null;
						testProcess.TestPeakRam = null;
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;
						testLog.TestlogLog = "Game passed 'close on 3' test but failed to restart";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}

					//Log if game did not shut down after "3" press
					if ((bool)!testProcess.TestCloseOn3)
					{
						testLog.TestlogLog = "Game failed 'close on 3' test";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;
					}

					//Test whether game will close on "Escape" key press
					i = EscapeFile(exeFiles[0]);

					//Log if game did not shut down after "Escape" press
					if (i == 0)
						testProcess.TestCloseOnEscape = true;

					else if (i == 1)
						testProcess.TestCloseOnEscape = false;

					//Retry tests if the program is unable to restart after passing "3" test
					else if (i == 2)
					{
						testProcess.TestOpens = false;
						testProcess.Test5min = false;
						testProcess.TestAverageRam = null;
						testProcess.TestPeakRam = null;
						testProcess.TestCloseOn3 = false;
						testProcess.TestCloseOnEscape = false;
						testProcess.TestCloses = false;
						testLog.TestlogLog = "Game passed 'close on Escape' test but failed to restart";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}

					//Log if game did not shut down after "3" press
					if ((bool)!testProcess.TestCloseOnEscape)
					{
						testLog.TestlogLog = "Game failed 'close on Escape' test";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;
					}

					//stop .exe, check to see if it stopped
					testProcess.TestCloses = StopFile(exeFiles[0]);

					if ((bool)!testProcess.TestCloses)
					{
						testLog.TestlogLog = "Game Failed Stop Test";
						testLog.TestlogDatetimeUtc = DateTime.UtcNow;

						_webData.PostTestingLog(testLog, _client);
						continue;
					}


					//If all tests passed, update game object and stop rechecking
					if ((bool)testProcess.TestOpens && (bool)testProcess.Test5min && (bool)testProcess.TestCloses)
					{
						myGame.GameReviewDateUtc = DateTime.UtcNow;
						myGame.GameStatus = "p";

						_webData.PutGames(myGame, _client);

						break;
					}
				}

				//Delete game from test queue and push the test results to database
				_webData.DeleteTestQueue(testsQueue.GameId, _client);
				_webData.PutTests(testProcess, _client);
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
			}
		}

		//Finds folder within directory and returns its path
		public string FindSubDir(string dir)
		{
			try
			{
				string[] directories = Directory.GetDirectories(dir);

				return directories[0];
			}
			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}
		}

		//Stores list of file names within game folder
		public string FolderFileNames(string unzipFile)
		{
			try
			{ 
				return string.Join(";", System.IO.Directory.GetFiles(unzipFile));
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}
		}

		//Finds .exe file within directory and returns its path
		public string[] FindExe(string unzipFile)
		{
			try
			{
				return System.IO.Directory.GetFiles(unzipFile, "*.exe");
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}

		}

		//Starts .exe file and checks to see whether the process is running
		public bool StartFile(string exeFile)
		{
			try
			{
				gameProcess = Process.Start(exeFile);

				return Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0;
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return false;
			}
		}

		//Waits 5 minutes and then checks to see if process is still running
		public bool SleepFile(string exeFile)
		{
			try
			{
				Thread.Sleep(5000);

				return Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0;
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return false;
			}
		}

		//Records memory usage by game process
		public string RamFile()
		{
			try
			{
				long gameRAM = gameProcess.WorkingSet64;

				return gameRAM.ToString();
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}
		}

		//Records peak memory usage by game process
		public string PeakRamFile()
		{
			try
			{
				long peakGameRAM = gameProcess.PeakWorkingSet64;

				return peakGameRAM.ToString();
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}
		}

		//Checks whether game process closes on "3" press
		public int CloseOn3(string exeFile)
		{
			try
			{
				Thread.Sleep(6000);
				InputSimulator s = new InputSimulator();
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.VK_3);

				Thread.Sleep(3000);

				//Return if game did not shut down on "3" press
				if (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0)
					return 1;

				//Restart game process for further testing
				bool restart = StartFile(exeFile);

				//Return if game did not properly launch again
				if (!restart)
					return 2;

				//Return if game passed "3" test and properly relaunched
				return 0;
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return 1;
			}
		}

		//Attempts to close process with Escape Key and checks whether program has shut down
		public int EscapeFile(string exeFile)
		{
			try
			{
				bool res;

				//Attempt to shut down game with "Escape" key press
				Thread.Sleep(6000);
				InputSimulator s = new InputSimulator();
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.ESCAPE);

				res = (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);

				if (!res)
				{
					res = StartFile(exeFile);
					if (res)
						return 0;

					return 2;
				}

				//Send "Enter" key press if the "Escape" was not sufficient to shut down game
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.RETURN);

				res = (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);

				if (!res)
				{
					res = StartFile(exeFile);
					if (res)
						return 0;

					return 2;
				}

				//Retry process, in case pressing "Escape" brings up a prompt menu which you must navigate to shut down game
				Thread.Sleep(3000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.ESCAPE);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.LEFT);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.RETURN);

				res = (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);

				if (!res)
				{
					res = StartFile(exeFile);
					if (res)
						return 0;

					return 2;
				}

				Thread.Sleep(3000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.ESCAPE);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.RIGHT);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.RETURN);

				res = (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);

				if (!res)
				{
					res = StartFile(exeFile);
					if (res)
						return 0;

					return 2;
				}

				Thread.Sleep(3000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.ESCAPE);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.DOWN);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.RETURN);

				res = (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);

				if (!res)
				{
					res = StartFile(exeFile);
					if (res)
						return 0;

					return 2;
				}

				Thread.Sleep(3000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.ESCAPE);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.UP);
				Thread.Sleep(1000);
				s.Keyboard.KeyPress(WindowsInput.Native.VirtualKeyCode.RETURN);

				res = (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);

				if (!res)
				{
					res = StartFile(exeFile);
					if (res)
						return 0;

					return 2;
				}

				return 1;
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return 1;
			}
		}

		//Kills process and then checks to see if process has succesfully been closed
		public bool StopFile(string exeFile)
		{
			try
			{
				gameProcess.Kill();

				Thread.Sleep(3000);

				return !(Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);
			}

			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return false;
			}
		}
	}

}
