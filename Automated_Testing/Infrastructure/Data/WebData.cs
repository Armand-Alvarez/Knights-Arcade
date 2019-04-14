﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Automated_Testing.Infrastructure.Data.Interface;
using Automated_Testing.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace Automated_Testing.Infrastructure.Data
{
    public class WebData : IWebData
    {
        private readonly ILogger<WebData> _logger;
        private readonly string _host;

        public WebData(ILogger<WebData> logger)
        {
            _logger = logger;
            _host = "www.knightsarcade.com";
        }

        public bool SendWebMessage(string url, object data)
        {
            try
            {
                HttpClient client = new HttpClient();
                string json = JsonConvert.SerializeObject(data);
                client.PostAsJsonAsync(url, json);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }

        public TestsQueue GetFirstTestQueue()
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.GetAsync("http://" + _host + "/api/v1/Public/rds/testsqueue/firsttestsqueue").Result;
                string json = response.Content.ReadAsStringAsync().Result;
                TestsQueue test = JsonConvert.DeserializeObject<TestsQueue>(json);

                return test;
            }

            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return null;
            }
        }

        public List<TestsQueue> GetAllTestsQueue()
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.GetAsync("http://" + _host + "/api/v1/Public/rds/testsqueue/alltestsqueue").Result;
                string json = response.Content.ReadAsStringAsync().Result;
                List<TestsQueue> test = JsonConvert.DeserializeObject<List<TestsQueue>>(json);

                return test;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return null;
            }
        }

        public bool PutTestsQueue(TestsQueue myTest)
        {
            try
            {
                HttpClient client = new HttpClient();

                HttpResponseMessage response = client.PutAsJsonAsync("http://" + _host + "/api/v1/Restricted/rds/testsqueue/testqueue", myTest).Result;

                if (response.StatusCode.ToString() == "OK")
                {
                    return true;
                }

                return false;

            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }

        }

        public GamesEntry GetGamesByID(int? gameID)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.GetAsync("http://" + _host + "/api/v1/Public/rds/games/gamesbyid?gameId=" + gameID).Result;
                string json = response.Content.ReadAsStringAsync().Result;
                GamesEntry games = JsonConvert.DeserializeObject<GamesEntry>(json);

                return games;
            }

            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return null;
            }
        }

        public bool DeleteTestQueue(int? gameID)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.DeleteAsync("http://" + _host + "/api/v1/Restricted/rds/testsqueue/testqueue?gameId=" + gameID).Result;

                if (response.StatusCode.ToString() == "NoContent")
                {
                    return true;
                }

                return false;
            }

            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }

        }

        public bool PutTests(Tests myTest)
        {
            try
            {
                HttpClient client = new HttpClient();

                HttpResponseMessage response = client.PutAsJsonAsync("http://" + _host + "/api/v1/Restricted/rds/tests/test", myTest).Result;

                if (response.StatusCode.ToString() == "OK")
                {
                    return true;
                }

                return false;
            }

            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }

        public bool PostTestingLog(TestingLog testLog)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.PostAsJsonAsync("http://" + _host + "/api/v1/Restricted/rds/testinglog/testinglog", testLog).Result;

                if (response.StatusCode.ToString() == "Created")
                {
                    return true;
                }

                return false;

            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }

        }

        public bool PutGames(GamesEntry myGame)
        {
            try
            {
                HttpClient client = new HttpClient();

                HttpResponseMessage response = client.PutAsJsonAsync("http://" + _host + "/api/v1/Restricted/rds/games/game", myGame).Result;

                if (response.StatusCode.ToString() == "OK")
                {
                    return true;
                }

                return false;
            }

            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }

        public bool StopAutomatedTestingEC2()
        {
            try
            {
                HttpClient client = new HttpClient();
                bool i = false;

                HttpResponseMessage response = client.PutAsJsonAsync("http://" + _host + "/api/v1/Restricted/aws/ec2/stop", i).Result;

                if (response.StatusCode.ToString() == "OK")
                {
                    return true;
                }

                return false;
            }

            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }
    }
}