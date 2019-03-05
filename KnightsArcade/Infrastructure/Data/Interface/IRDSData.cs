using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnightsArcade.Models;

namespace KnightsArcade.Infrastructure.Data.Interface
{
    public interface IRDSData
    {
        Games GetGames(int gameId);
        Games GetGames(string gameName);
        List<Games> GetAllGames();
        void PostGames(Games games);
        void PutGames(Games games);
        void DeleteGames(int gameId);

        Submissions GetSubmissions(int gameId);
        List<Submissions> GetAllSubmissions();
        void PostSubmissions(Submissions submission);
        void PutSubmissions(Submissions submission);
        void DeleteSubmissions(int gameId);

        Tests GetTests(int gameId);
        List<Tests> GetAllTests();
        void PostTests(Tests test);
        void PutTests(Tests test);
        void DeleteTests(int gameId);

        TestsQueue GetTestsQueue(int gameId);
        TestsQueue GetTestsQueue();
        List<TestsQueue> GetAllTestsQueue();
        void PostTestsQueue(TestsQueue test);
        void PutTestsQueue(int gameId);
        void DeleteTestsQueue(int gameId);
    }
}
