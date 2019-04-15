using KnightsArcade.Infrastructure.Data.Interface;
using KnightsArcade.Models.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace KnightsArcade.Infrastructure.Data
{
    public class RDSData : IRDSData
    {
        private readonly IConfiguration _configuration;

        public RDSData(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        ///////
        //// Games Table
        ///////

        public Games GetGames(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Games myGame = knightsContext.Games.Find(gameId);
            return myGame;
        }

        public Games GetGames(string gameName)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Games game = knightsContext.Games.Where(x => x.GameName == gameName).ToList().FirstOrDefault();
            return game;
        }

        public List<Games> GetAllGames()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<Games> myGames = knightsContext.Games.ToList();
            return myGames;
        }

        public void PostGames(Games game)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.Games.Add(game);
            knightsContext.SaveChanges();
        }

        public void PutGames(Games game)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Games updatedGame = GetGames((int)game.GameId);

            if (game.GameControls != null) { updatedGame.GameControls = game.GameControls; }
            if (game.GameDescription != null) { updatedGame.GameDescription = game.GameDescription; }
            if (game.GameGenreAction != null) { updatedGame.GameGenreAction = game.GameGenreAction; }
            if (game.GameGenreAdventure != null) { updatedGame.GameGenreAdventure = game.GameGenreAdventure; }
            if (game.GameGenreFighting != null) { updatedGame.GameGenreFighting = game.GameGenreFighting; }
            if (game.GameGenrePuzzle != null) { updatedGame.GameGenrePuzzle = game.GameGenrePuzzle; }
            if (game.GameGenreRacing != null) { updatedGame.GameGenreRacing = game.GameGenreRacing; }
            if (game.GameGenreRpg != null) { updatedGame.GameGenreRpg = game.GameGenreRpg; }
            if (game.GameGenreShooter != null) { updatedGame.GameGenreShooter = game.GameGenreShooter; }
            if (game.GameGenreSports != null) { updatedGame.GameGenreSports = game.GameGenreSports; }
            if (game.GameGenreStrategy != null) { updatedGame.GameGenreStrategy = game.GameGenreStrategy; }
            if (game.GameGenreSurvival != null) { updatedGame.GameGenreSurvival = game.GameGenreSurvival; }
            if (game.GameImage0 != null) { updatedGame.GameImage0 = game.GameImage0; }
            if (game.GameImage1 != null) { updatedGame.GameImage1 = game.GameImage1; }
            if (game.GameImage2 != null) { updatedGame.GameImage2 = game.GameImage2; }
            if (game.GameImage3 != null) { updatedGame.GameImage3 = game.GameImage3; }
            if (game.GameImage4 != null) { updatedGame.GameImage4 = game.GameImage4; }
            if (game.GameName != null) { updatedGame.GameName = game.GameName; }
            if (game.GamePath != null) { updatedGame.GamePath = game.GamePath; }
            if (game.GameStatus != null) { updatedGame.GameStatus = game.GameStatus; }
            if (game.GameVideolink != null) { updatedGame.GameVideolink = game.GameVideolink; }
            if (game.GameAvailableToDownload != null) { updatedGame.GameAvailableToDownload = game.GameAvailableToDownload; }
            if (game.GameOnArcade != null) { updatedGame.GameOnArcade = game.GameOnArcade; }
            if (game.GameReviewDateUtc != null) { updatedGame.GameReviewDateUtc = game.GameReviewDateUtc; }

            knightsContext.Entry<Games>(updatedGame).State = EntityState.Modified;
            knightsContext.SaveChanges();
        }

        public void DeleteGames(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Games myGame = GetGames(gameId);
            knightsContext.Games.Remove(myGame);
            knightsContext.SaveChanges();
        }

        ///////
        //// Submissions Table
        ///////

        public Submissions GetSubmissions(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Submissions submission = knightsContext.Submissions.Find(gameId);
            return submission;
        }

        public List<Submissions> GetAllSubmissions()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<Submissions> submissions = knightsContext.Submissions.ToList();
            return submissions;
        }

        public void PostSubmissions(Submissions submission)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.Submissions.Add(submission);
            knightsContext.SaveChanges();
        }

        public void PutSubmissions(Submissions submission)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Submissions updatedSubmission = GetSubmissions((int)submission.GameId);

            if (submission.SubmissionImage0 != null)
            {
                updatedSubmission.SubmissionImage0 = submission.SubmissionImage0;
            }
            if (submission.SubmissionReviewDateUtc != null)
            {
                updatedSubmission.SubmissionReviewDateUtc = submission.SubmissionReviewDateUtc;
            }
            if (submission.SubmissionStatus != null)
            {
                updatedSubmission.SubmissionStatus = submission.SubmissionStatus;
            }
            if (submission.SubmissionReviewComments != null)
            {
                updatedSubmission.SubmissionReviewComments = submission.SubmissionReviewComments;
            }
            if (submission.CreatorEmail != null)
            {
                updatedSubmission.CreatorEmail = submission.CreatorEmail;
            }

            knightsContext.Entry<Submissions>(updatedSubmission).State = EntityState.Modified;
            knightsContext.SaveChanges();
        }

        public void DeleteSubmissions(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Submissions submission = GetSubmissions(gameId);
            knightsContext.Submissions.Remove(submission);
            knightsContext.SaveChanges();
        }

        ///////
        //// Tests Table
        ///////

        public Tests GetTests(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Tests test = knightsContext.Tests.Find(gameId);
            return test;
        }

        public List<Tests> GetAllTests()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<Tests> tests = knightsContext.Tests.ToList();
            return tests;
        }

        public void PostTests(Tests test)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.Tests.Add(test);
            knightsContext.SaveChanges();
        }

        public void PutTests(Tests test)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Tests updatedTest = GetTests((int)test.GameId);

            if (test.Test5min != null)
            {
                updatedTest.Test5min = test.Test5min;
            }
            if (test.TestAttempts != null)
            {
                updatedTest.TestAttempts = test.TestAttempts;
            }
            if (test.TestCloses != null)
            {
                updatedTest.TestCloses = test.TestCloses;
            }
            if (test.TestOpens != null)
            {
                updatedTest.TestOpens = test.TestOpens;
            }
            if (test.TestCloseOn3 != null)
            {
                updatedTest.TestCloseOn3 = test.TestCloseOn3;
            }
            if (test.TestCloseOnEscape != null)
            {
                updatedTest.TestCloseOnEscape = test.TestCloseOnEscape;
            }
            if (test.TestAverageRam != null)
            {
                updatedTest.TestAverageRam = test.TestAverageRam;
            }
            if (test.TestFolderFileNames != null)
            {
                updatedTest.TestFolderFileNames = test.TestFolderFileNames;
            }
            if (test.TestNumExeFiles != null)
            {
                updatedTest.TestNumExeFiles = test.TestNumExeFiles;
            }
            if (test.TestPeakRam != null)
            {
                updatedTest.TestPeakRam = test.TestPeakRam;
            }

            knightsContext.Entry<Tests>(updatedTest).State = EntityState.Modified;
            knightsContext.SaveChanges();
        }

        public void DeleteTests(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Tests test = knightsContext.Tests.Find(gameId);
            knightsContext.Tests.Remove(test);
            knightsContext.SaveChanges();
            return;
        }

        ///////
        //// TestsQueue Table
        ///////

        public TestsQueue GetTestsQueue(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            TestsQueue testsQueue = knightsContext.Testsqueue.Find(gameId);
            return testsQueue;
        }

        public TestsQueue GetTestsQueue()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            TestsQueue testsQueue = knightsContext.Testsqueue.FirstOrDefault();
            return testsQueue;
        }

        public List<TestsQueue> GetAllTestsQueue()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<TestsQueue> testsQueues = knightsContext.Testsqueue.ToList();
            return testsQueues;
        }

        public void PostTestsQueue(TestsQueue testsQueue)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.Testsqueue.Add(testsQueue);
            knightsContext.SaveChanges();
        }

        public void PutTestsQueue(TestsQueue testsQueue)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.Entry<TestsQueue>(testsQueue).State = EntityState.Modified;
            knightsContext.SaveChanges();
        }

        public void DeleteTestsQueue(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            TestsQueue testsQueue = knightsContext.Testsqueue.Find(gameId);
            knightsContext.Testsqueue.Remove(testsQueue);
            knightsContext.SaveChanges();
        }

        ///////
        //// Users
        ///////

        public Users GetUser(string username)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Users user = knightsContext.Users.Find(username);
            return user;
        }

        public List<Users> GetAllUsers()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<Users> users = knightsContext.Users.ToList();
            return users;
        }

        public void PostUser(Users user)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.Users.Add(user);
            knightsContext.SaveChanges();
        }

        public void PutUser(Users updatedUserInfo)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Users currentUserInfo = GetUser(updatedUserInfo.Username);

            if(updatedUserInfo.UserMajor != null)
            {
                currentUserInfo.UserMajor = updatedUserInfo.UserMajor;
            }
            if (updatedUserInfo.UserLastName != null)
            {
                currentUserInfo.UserLastName = updatedUserInfo.UserLastName;
            }
            if (updatedUserInfo.UserFirstName != null)
            {
                currentUserInfo.UserFirstName = updatedUserInfo.UserFirstName;
            }
            if (updatedUserInfo.UserImagePath != null)
            {
                currentUserInfo.UserImagePath = updatedUserInfo.UserImagePath;
            }
            if (updatedUserInfo.UserEmail != null)
            {
                currentUserInfo.UserEmail = updatedUserInfo.UserEmail;
            }

            knightsContext.Entry<Users>(currentUserInfo).State = EntityState.Modified;
            knightsContext.SaveChanges();
        }

        public void DeleteUser(string username)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            Users user = knightsContext.Users.Find(username);
            knightsContext.Users.Remove(user);
            knightsContext.SaveChanges();
        }

        ///////
        //// TestingLog
        ///////

        public List<TestingLog> GetAllTestingLogs()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<TestingLog> testingLogs = knightsContext.TestingLog.ToList();
            return testingLogs;
        }

        public List<TestingLog> GetTestingLog(int gameId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<TestingLog> testingLogs = knightsContext.TestingLog.Where(x => x.GameId == gameId).ToList();
            return testingLogs;
        }

        public void PostTestingLog(TestingLog testingLog)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.TestingLog.Add(testingLog);
            knightsContext.SaveChanges();
        }

        ///////
        //// Arcade Machines
        ///////

        public List<ArcadeMachine> GetAllArcadeMachines()
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            List<ArcadeMachine> arcadeMachines = knightsContext.ArcadeMachines.ToList();
            return arcadeMachines;
        }

        public ArcadeMachine PostArcadeMachine(ArcadeMachine arcadeMachine)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            knightsContext.ArcadeMachines.Add(arcadeMachine);
            knightsContext.SaveChanges();
            return arcadeMachine;
        }

        public void PutArcadeMachine(ArcadeMachine arcadeMachine)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            ArcadeMachine updatedArcadeMachine = knightsContext.ArcadeMachines.Find(arcadeMachine.ArcadeMachineId);

            if (arcadeMachine.ArcadeMachineRoom != null)
            {
                updatedArcadeMachine.ArcadeMachineRoom = arcadeMachine.ArcadeMachineRoom;
            }
            if (arcadeMachine.ArcadeMachineDescription != null)
            {
                updatedArcadeMachine.ArcadeMachineDescription = arcadeMachine.ArcadeMachineDescription;
            }
            if (arcadeMachine.ArcadeMachineCoords != null)
            {
                updatedArcadeMachine.ArcadeMachineCoords = arcadeMachine.ArcadeMachineCoords;
            }
            if (arcadeMachine.ArcadeMachineAddress != null)
            {
                updatedArcadeMachine.ArcadeMachineAddress = arcadeMachine.ArcadeMachineAddress;
            }
            if(arcadeMachine.ArcadeMachineName != null)
            {
                updatedArcadeMachine.ArcadeMachineName = arcadeMachine.ArcadeMachineName;
            }

            knightsContext.Entry<ArcadeMachine>(updatedArcadeMachine).State = EntityState.Modified;
            knightsContext.SaveChanges();
        }

        public void DeleteArcadeMachine(int? arcadeMachineId)
        {
            DbContextOptionsBuilder<KnightsArcadeContext> bootUp = new DbContextOptionsBuilder<KnightsArcadeContext>();
            bootUp.UseMySql(_configuration.GetConnectionString("KnightsArcadeDb"));
            KnightsArcadeContext knightsContext = new KnightsArcadeContext(bootUp.Options);

            ArcadeMachine arcadeMachine = knightsContext.ArcadeMachines.Find(arcadeMachineId);
            knightsContext.ArcadeMachines.Remove(arcadeMachine);
            knightsContext.SaveChanges();
        }
    }

}
