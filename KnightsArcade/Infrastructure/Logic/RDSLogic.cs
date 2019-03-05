using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnightsArcade.Infrastructure.Data.Interface;
using KnightsArcade.Models;
using Microsoft.Extensions.Logging;

namespace KnightsArcade.Infrastructure.Logic
{
    public class RDSLogic
    {
        private readonly IRDSData _rdsData;
        private readonly ILogger<RDSLogic> _logger;

        public RDSLogic(IRDSData rdsData, ILogger<RDSLogic> logger)
        {
            _rdsData = rdsData;
            _logger = logger;
        }

        public void PostNewEntry(NewEntry newEntry)
        {
            Games newGame = new Games()
            {
                GameControls = newEntry.GameControls,
                GameCreatorId = newEntry.GameCreatorId,
                GameCreatorName = newEntry.GameCreatorName,
                GameDescription = newEntry.GameDescription,
                GameGenres = newEntry.GameGenres,
                GameImage0 = newEntry.GameImage0,
                GameImage1 = newEntry.GameImage1,
                GameImage2 = newEntry.GameImage2,
                GameImage3 = newEntry.GameImage3,
                GameImage4 = newEntry.GameImage4,
                GameName = newEntry.GameName,
                GamePath = newEntry.GamePath,
                GameVideolink = newEntry.GameVideoLink,
                GameOnArcade = false,
                GameStatus = "t",
                GameSubmissionDateUtc = DateTime.UtcNow
            };

            _rdsData.PostGames(newGame);
            Games postedGame = _rdsData.GetGames(newGame.GameName);

            Submissions newSubmission = new Submissions()
            {
                GameId = postedGame.GameId,
                SubmissionDateUtc = postedGame.GameSubmissionDateUtc,
                SubmissionImage0 = postedGame.GameImage0,
                SubmissionName = postedGame.GameName,
                SubmissionStatus = postedGame.GameStatus,
                CreatorId = postedGame.GameCreatorId
            };

            _rdsData.PostSubmissions(newSubmission);

            TestsQueue newTestQueue = new TestsQueue()
            {
                GameId = postedGame.GameId,
                RetryCount = 0
            };

            _rdsData.PostTestsQueue(newTestQueue);

            Tests newTest = new Tests()
            {
                GameId = postedGame.GameId,
                Test5min = 0,
                TestCloses = 0,
                TestOpens = 0,
                TestRandombuttons = 0,
                TestAttempts = 0
            };

            _rdsData.PostTests(newTest);

            return;
        }

        ///////
        //// Games Table
        ///////

        public Games GetGames(int gameId)
        {
            return _rdsData.GetGames(gameId);
        }

        public Games GetGames(string gameName)
        {
            return _rdsData.GetGames(gameName);
        }

        public List<Games> GetAllGames()
        {
            return _rdsData.GetAllGames();
        }

        public void PutGames(Games game)
        {
            _rdsData.PutGames(game);

            Submissions submission = new Submissions();

            submission.GameId = game.GameId;
            if (game.GameImage0 != null)
            {
                submission.SubmissionImage0 = game.GameImage0;
            }
            if (game.GameReviewDateUtc != null)
            {
                submission.SubmissionReviewDateUtc = game.GameReviewDateUtc;
            }
            if (game.GameStatus != null)
            {
                submission.SubmissionStatus = game.GameStatus;
            }
            _rdsData.PutSubmissions(submission);

            return;
        }

        public void DeleteGames(int gameId)
        {
            _rdsData.DeleteGames(gameId);
            return;
        }

        ///////
        //// Submissions Table
        ///////

        public Submissions GetSubmissions(int gameId)
        {
            return _rdsData.GetSubmissions(gameId);
        }

        public List<Submissions> GetAllSubmissions()
        {
            return _rdsData.GetAllSubmissions();
        }

        public void PutSubmissions(Submissions submission)
        {
            _rdsData.PutSubmissions(submission);

            try
            {
                Games game = new Games();

                game.GameId = submission.GameId;
                if (submission.SubmissionImage0 != null)
                {
                    game.GameImage0 = submission.SubmissionImage0;
                }
                if (submission.SubmissionReviewDateUtc != null)
                {
                    game.GameReviewDateUtc = submission.SubmissionReviewDateUtc;
                }
                if (submission.SubmissionStatus != null)
                {
                    game.GameStatus = submission.SubmissionStatus;
                }
                _rdsData.PutGames(game);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
            }

            return;
        }

        ///////
        //// Tests Table
        ///////

        public Tests GetTests(int gameId)
        {
            return _rdsData.GetTests(gameId);
        }

        public List<Tests> GetAllTests()
        {
            return _rdsData.GetAllTests();
        }

        public void PutTests(Tests test)
        {
            _rdsData.PutTests(test);
            return;
        }

        public void DeleteTests(int gameId)
        {
            _rdsData.DeleteTests(gameId);
            return;
        }

        ///////
        //// TestsQueue Table
        ///////

        public TestsQueue GetTestsQueue(int gameId)
        {
            return _rdsData.GetTestsQueue(gameId);
        }

        public TestsQueue GetTestsQueue()
        {
            return _rdsData.GetTestsQueue();
        }

        public List<TestsQueue> GetAllTestsQueue()
        {
            return _rdsData.GetAllTestsQueue();
        }

        public void PutTestsQueue(int gameId)
        {
            _rdsData.PutTestsQueue(gameId);

            TestsQueue testsQueue = _rdsData.GetTestsQueue(gameId);
            Tests test = _rdsData.GetTests(gameId);
            test.TestAttempts = testsQueue.RetryCount;

            _rdsData.PutTests(test);
            return;
        }

        public void DeleteTestsQueue(int gameId)
        {
            _rdsData.DeleteTestsQueue(gameId);
            return;
        }
    }
}
