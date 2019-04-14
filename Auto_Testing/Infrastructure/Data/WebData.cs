using Auto_Testing.Infrastructure.Data.Interface;
using Auto_Testing.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using Amazon.Extensions.CognitoAuthentication;
using Amazon.CognitoIdentityProvider;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;

namespace Auto_Testing.Infrastructure.Data
{
	public class WebData : IWebData
	{
		private readonly ILogger<WebData> _logger;
		private readonly string _host;
		private readonly string _accessToken;
		/*
		public WebData(ILogger<WebData> logger, IConfiguration configuration)
		{
			_logger = logger;
			//_host = "www.knightsarcade.com";
			_host = "http://localhost:52445/";
			IAmazonCognitoIdentityProvider provider = new AmazonCognitoIdentityProviderClient(
				configuration.GetSection("ConnectionStrings:AWSAccessKey").Value,
				configuration.GetSection("ConnectionStrings:AWSSecretKey").Value,
				Amazon.RegionEndpoint.USEast2);

			CognitoUserPool pool = new CognitoUserPool("us-east-2_6Izn99otx", "1q2159sfmhcu3tphkf7c1am1s1", provider);
			CognitoUser user = pool.GetUser("automated-testing-user");
			CognitoUserSession userSession = user.SessionTokens;
			_accessToken = userSession.AccessToken;
		}
		*/
		public WebData(ILogger<WebData> logger)
		{
			_logger = logger;
			//_host = "www.knightsarcade.com";
			_host = "localhost:52445";
		}

		public bool SendWebMessage(string url, object data)
		{
			try
			{
				HttpClient client = new HttpClient();
				string json = JsonConvert.SerializeObject(data);
				client.PostJsonAsync(url, json);
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
				myTest.RetryCount++;
				HttpClient client = new HttpClient();
				string json = JsonConvert.SerializeObject(myTest);

				var buffer = System.Text.Encoding.UTF8.GetBytes(json);
				var byteContent = new ByteArrayContent(buffer);
				byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
				HttpResponseMessage response = client.PutAsync(new Uri("http://" + _host + "/api/v1/Restricted/rds/testsqueue/testqueue"), byteContent).Result;


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
				string json = JsonConvert.SerializeObject(myTest);
				var buffer = System.Text.Encoding.UTF8.GetBytes(json);
				var byteContent = new ByteArrayContent(buffer);
				byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

				HttpResponseMessage response = client.PutAsync(new Uri("http://" + _host + "/api/v1/Restricted/rds/tests/test"), byteContent).Result;

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
				string json = JsonConvert.SerializeObject(testLog);
				var buffer = System.Text.Encoding.UTF8.GetBytes(json);
				var byteContent = new ByteArrayContent(buffer);
				byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

				HttpResponseMessage response = client.PostAsync("http://" + _host + "/api/v1/Restricted/rds/testinglog/testinglog", byteContent).Result;

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
				string json = JsonConvert.SerializeObject(myGame);
				var buffer = System.Text.Encoding.UTF8.GetBytes(json);
				var byteContent = new ByteArrayContent(buffer);
				byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

				HttpResponseMessage response = client.PutAsync(new Uri("http://" + _host + "/api/v1/Restricted/rds/games/game"), byteContent).Result;


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
				string json = JsonConvert.SerializeObject(i);

				//HttpResponseMessage response = client.PutAsJsonAsync("http://" + _host + "/api/v1/Restricted/aws/ec2/stop", i).Result;
				HttpResponseMessage response = client.PutAsync("http://" + _host + "/api/v1/Restricted/aws/ec2/stop", new StringContent(json, Encoding.UTF8, "application/json")).Result;

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
