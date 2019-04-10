using KnightsArcade.Models.Database;
using System.Collections.Generic;

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
        void PutTestsQueue(TestsQueue testsQueue);
        void DeleteTestsQueue(int gameId);

        Users GetUser(string username);
        List<Users> GetAllUsers();
        void PostUser(Users user);
        void PutUser(Users user);
        void DeleteUser(string username);

        List<TestingLog> GetAllTestingLogs();
        List<TestingLog> GetTestingLog(int gameId);
        void PostTestingLog(TestingLog testingLog);

        List<ArcadeMachine> GetAllArcadeMachines();
        ArcadeMachine PostArcadeMachine(ArcadeMachine arcadeMachine);
        void PutArcadeMachine(ArcadeMachine arcadeMachine);
        void DeleteArcadeMachine(int? arcadeMachineId);
    }
}
