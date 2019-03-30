using AutomatedTesting.Infrastructure.Data.Infrastructure;
using AutomatedTesting.Infrastructure.Data.Interface;
using AutomatedTesting.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;

namespace AutomatedTesting.Infrastructure.Logic
{
    public class TestingLogic
    {
        private readonly ILogger<TestingLogic> _logger;
        private readonly IS3Data _s3Data;
        private readonly IWebData _webData;
        private readonly object _sync;
        public Process gameProcess;

        public TestingLogic(ILogger<TestingLogic> logger, IS3Data s3Data, IWebData webData)
        {
            _logger = logger;
            _s3Data = s3Data;
            _webData = webData;
            _sync = new object();
        }

        public void RunAllEntryTests()
        {
            try
            {
                TestsQueue testsQueue = _webData.GetFirstTestQueue();

                while(testsQueue != null)
                {
                    lock (_sync)
                    {
                        Tests testProcess = new Tests();
                        TestingLog testLog = new TestingLog();
                        testProcess.GameId = testsQueue.GameId;
                        testLog.GameId = (int)testsQueue.GameId;

                        RunSingleEntryTest(testsQueue, testProcess, testLog);
                    }

                    testsQueue = _webData.GetFirstTestQueue();
                }

                //_webData.StopAutomatedTestingEC2();
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                //_webData.StopAutomatedTestingEC2();
            }
        }

        public void RunSingleEntryTest(TestsQueue testsQueue, Tests testProcess, TestingLog testLog)
        {
            try
            {
                while (testsQueue.RetryCount < 3)
                {
                    testLog.TestlogAttempt = (int)testsQueue.RetryCount;

                    //_webData.PutTestsQueue(testsQueue);

                    GamesEntry myGame = _webData.GetGamesByID(testsQueue.GameId);

                    //Retry to pull game if it failed the first time
                    if (myGame == null)
                    {
                        testProcess.TestOpens = false;
                        testProcess.Test5min = false;
                        testProcess.TestCloses = false;

                        continue;
                    }

                    string debugKey = "public/" + myGame.GamePath;
                    string fileLocation = _s3Data.ReadObjectDataAsync(debugKey).Result;

                    //Point variable to folder which contains .exe file
                    fileLocation = FindSubDir(fileLocation);

                    //Find .exe file path
                    string exeFile = FindExe(fileLocation);


                    gameProcess = new Process();

                    //start .exe, check to see if it started
                    testProcess.TestOpens = StartFile(exeFile);

                    //Retry tests if process does not start
                    if (!(bool)testProcess.TestOpens)
                    {
                        testProcess.Test5min = false;
                        testProcess.TestCloses = false;
                        testLog.TestlogLog = "Game Failed Start Test";
                        testLog.TestlogDatetimeUtc = DateTime.UtcNow;

                        _webData.PostTestingLog(testLog);
                        continue;
                    }

                    //Check to see if game still running after 5 min
                    testProcess.Test5min = SleepFile(exeFile);

                    //Retry tests if process does not stay open for 5 min
                    if ((bool)!testProcess.Test5min)
                    {
                        testProcess.TestCloses = false;
                        testLog.TestlogLog = "Game Failed Sleep Test";
                        testLog.TestlogDatetimeUtc = DateTime.UtcNow;

                        _webData.PostTestingLog(testLog);
                        continue;
                    }

                    //Store memory usage by game process
                    testProcess.TestAverageRam = RamFile(exeFile);

                    //stop .exe, check to see if it stopped
                    testProcess.TestCloses = StopFile(exeFile);

                    if ((bool)!testProcess.TestCloses)
                    {
                        testLog.TestlogLog = "Game Failed Stop Test";
                        testLog.TestlogDatetimeUtc = DateTime.UtcNow;

                        _webData.PostTestingLog(testLog);
                        continue;
                    }

                    //If all tests passed, update game object and stop rechecking
                    if ((bool)testProcess.TestOpens && (bool)testProcess.Test5min && (bool)testProcess.TestCloses)
                    {
                        myGame.GameReviewDateUtc = DateTime.UtcNow;
                        myGame.GameStatus = "p";

                        _webData.PutGames(myGame);

                        break;
                    }
                }

                //Delete game from test queue and push the test results to database
                _webData.DeleteTestQueue(testsQueue.GameId);
                _webData.PutTests(testProcess);
            }

            catch(Exception e)
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

        //Finds .exe file within directory and returns its path
        string FindExe(string unzipFile)
        {
            try
            {
                string[] files = System.IO.Directory.GetFiles(unzipFile, "*.exe");

                return files[0];
            }

            catch(Exception e)
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

            catch(Exception e)
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
                //Thread.Sleep(300000);

                return Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0;
            }

            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }

        //Records memory usage by game process
        public string RamFile(string exeFile)
        {
            try
            {
                long gameRAM = gameProcess.WorkingSet64;

                return gameRAM.ToString();
            }

            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return null;
            }
        }

        //Kills process and then checks to see if process has succesfully been closed
        public bool StopFile(string exeFile)
        {
            try
            {
                Thread.Sleep(5000);
                gameProcess.Kill();

                Thread.Sleep(3000);

                return !(Process.GetProcessesByName(Path.GetFileNameWithoutExtension(exeFile)).Length > 0);
            }

            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }
    }
}
