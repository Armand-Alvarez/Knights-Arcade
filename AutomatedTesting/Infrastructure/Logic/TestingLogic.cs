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
using System.Threading;
using System.Threading.Tasks;

namespace AutomatedTesting.Infrastructure.Logic
{
    public class TestingLogic
    {
        private readonly ILogger<TestingLogic> _logger;
        private readonly IS3Data _s3Data;
        private readonly Object _sync = new Object();
        private readonly IWebData _webData;
        public Tests testProcess = new Tests();


        public TestingLogic(ILogger<TestingLogic> logger, IS3Data s3Data, IWebData webData)
        {
            _logger = logger;
            _s3Data = s3Data;
            _webData = webData;
        }

        public void Start()
        {
            try
            {
                lock(_sync)
                {
                    TestsQueue testsQueue = _webData.GetFirstTestQueue();

                    while (testsQueue.RetryCount < 3)
                    {

                        _webData.PutTestsQueue(testsQueue);

                        Games myGame = _webData.GetGamesByID(testsQueue.GameId);

                        string debugKey = myGame.GamePath;
                        string fileLocation = _s3Data.ReadObjectDataAsync(debugKey).Result;

                        //Point variable to folder which contains .exe file
                        fileLocation = FindSubDir(fileLocation);

                        //Find .exe file path
                        string exeFile = FindExe(fileLocation);

                        //start .exe, check to see if it started
                        testProcess.TestOpens = StartFile(exeFile);

                        //Quit out of tests if process does not start
                        if (!testProcess.TestOpens)
                        {
                            testProcess.Test5min = false;
                            testProcess.TestCloses = false;
                            continue;
                        }

                        //Thread.Sleep(5000);
                        testProcess.Test5min = SleepFile(exeFile);

                        //Quit out of tests if process does not stay open for 5 min
                        if (!testProcess.Test5min)
                        {
                            testProcess.TestCloses = false;
                            continue;
                        }

                        //stop .exe, check to see if it stopped
                        testProcess.TestCloses = StopFile(exeFile);
                    }

                    
                }
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
               testProcess.GameProcess = Process.Start(exeFile);

                return Process.GetProcessesByName(exeFile)
                    .FirstOrDefault(p => p.MainModule.FileName.StartsWith(@"c:\loc1")) != default(Process);
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
                Thread.Sleep(300000);

                return Process.GetProcessesByName(exeFile)
                   .FirstOrDefault(p => p.MainModule.FileName.StartsWith(@"c:\loc1")) != default(Process);
            }

            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }

        //Kills process and then checks to see if process has succesfully been closed
        public bool StopFile(string exeFile)
        {
            try
            {
                testProcess.GameProcess.Close();
                Thread.Sleep(18000);

                return Process.GetProcessesByName(exeFile)
                   .FirstOrDefault(p => p.MainModule.FileName.StartsWith(@"c:\loc1")) != default(Process);
            }

            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }
    }
}
