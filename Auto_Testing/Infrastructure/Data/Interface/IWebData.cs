using Auto_Testing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Auto_Testing.Infrastructure.Data.Interface
{

	public interface IWebData
	{
		bool SendWebMessage(string url, object data, HttpClient client);
		bool PutTestsQueue(TestsQueue myTest, HttpClient client);
		bool PutTests(Tests myTest, HttpClient client);
		bool DeleteTestQueue(int? gameID, HttpClient client);
		bool PostTestingLog(TestingLog testLog, HttpClient client);
		bool PutGames(GamesEntry myGame, HttpClient client);
		bool StopAutomatedTestingEC2(HttpClient client);
		TestsQueue GetFirstTestQueue(HttpClient client);
		List<TestsQueue> GetAllTestsQueue(HttpClient client);
		GamesEntry GetGamesByID(int? gameID, HttpClient client);
		
	}

}
