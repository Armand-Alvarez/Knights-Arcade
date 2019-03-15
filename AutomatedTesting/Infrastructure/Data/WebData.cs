using AutomatedTesting.Infrastructure.Data.Interface;
using AutomatedTesting.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace AutomatedTesting.Infrastructure.Data
{
    public class WebData : IWebData
    {
        private readonly ILogger<WebData> _logger;
        public WebData(ILogger<WebData> logger)
        {
            _logger = logger;
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
                HttpResponseMessage response = client.GetAsync("http://localhost:52445/api/v1/Public/rds/testsqueue/firsttestsqueue").Result;
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

        public bool PutTestsQueue(TestsQueue myTest)
        {
            try
            {
                HttpClient client = new HttpClient();
                //string json = JsonConvert.SerializeObject(myTest);
                HttpResponseMessage response = client.PutAsJsonAsync("http://localhost:52445/api/v1/Restricted/rds/testsqueue/testqueue", myTest).Result;

                if (response.StatusCode.ToString() == "200")
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
        
        public Games GetGamesByID(int? gameID)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.GetAsync("http://localhost:52445/api/v1/Public/rds/games/gamesbyid?gameId=" + gameID).Result;
                string json = response.Content.ReadAsStringAsync().Result;
                Games games = JsonConvert.DeserializeObject<Games>(json);

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
                HttpResponseMessage response = client.DeleteAsync("http://localhost:52445/api/v1/Restricted/rds/testsqueue/testqueue?gameId=" + gameID).Result;

                if (response.StatusCode.ToString() == "204")
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
                HttpResponseMessage response = client.PutAsJsonAsync("http://localhost:52445/api/v1/Restricted/rds/tests/test", myTest).Result;
               
                if (response.StatusCode.ToString() == "200" )
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
