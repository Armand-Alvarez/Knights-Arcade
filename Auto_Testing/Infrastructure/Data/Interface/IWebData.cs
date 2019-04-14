using Auto_Testing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auto_Testing.Infrastructure.Data.Interface
{

	public interface IWebData
	{
		bool SendWebMessage(string url, object data);
		bool PutTestsQueue(TestsQueue myTest);
		bool PutTests(Tests myTest);
		bool DeleteTestQueue(int? gameID);
		bool PostTestingLog(TestingLog testLog);
		bool PutGames(GamesEntry myGame);
		bool StopAutomatedTestingEC2();
		TestsQueue GetFirstTestQueue();
		List<TestsQueue> GetAllTestsQueue();
		GamesEntry GetGamesByID(int? gameID);
		
	}

}
