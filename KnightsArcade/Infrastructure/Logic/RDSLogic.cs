using KnightsArcade.Infrastructure.Data.Interface;
using KnightsArcade.Models;
using KnightsArcade.Models.Database;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public Tuple<Games, int> PostNewEntry(NewEntry newEntry)
        {
            Games newGame = new Games()
            {
                GameControls = newEntry.GameControls,
                GameCreatorName = newEntry.GameCreatorName,
                GameDescription = newEntry.GameDescription,
                GameGenreAction = newEntry.GameGenreAction,
                GameGenreAdventure = newEntry.GameGenreAdventure,
                GameGenreFighting = newEntry.GameGenreFighting,
                GameGenrePuzzle = newEntry.GameGenrePuzzle,
                GameGenreRacing = newEntry.GameGenreRacing,
                GameGenreRhythm = newEntry.GameGenreRhythm,
                GameGenreRpg = newEntry.GameGenreRpg,
                GameGenreShooter = newEntry.GameGenreShooter,
                GameGenreSports = newEntry.GameGenreSports,
                GameGenreStrategy = newEntry.GameGenreStrategy,
                GameGenreSurvival = newEntry.GameGenreSurvival,
                GameGenrePlatformer = newEntry.GameGenrePlatformer,
                GameName = newEntry.GameName,
                GamePath = newEntry.GamePath,
                GameVideolink = newEntry.GameVideoLink,
                GameOnArcade = false,
                GameStatus = "t",
                GameSubmissionDateUtc = DateTime.UtcNow,
                GameAvailableToDownload = newEntry.GameAvailableToDownload
            };
            char[] s = new char[5];

            newGame = InsertArrayToColumn(newGame, newEntry);
            if (_rdsData.GetGames(newGame.GameName) != null)
            {
                return Tuple.Create<Games, int>(null, 1);
            }

            try
            {
                _rdsData.PostGames(newGame);
                Games postedGame = _rdsData.GetGames(newGame.GameName);

                Submissions newSubmission = new Submissions()
                {
                    GameId = postedGame.GameId,
                    SubmissionDateUtc = postedGame.GameSubmissionDateUtc,
                    SubmissionImage0 = postedGame.GameImage0,
                    SubmissionName = postedGame.GameName,
                    SubmissionStatus = postedGame.GameStatus,
                    CreatorName = postedGame.GameCreatorName,
                    CreatorEmail = newEntry.GameCreatorEmail
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
                    Test5min = false,
                    TestCloses = false,
                    TestOpens = false,
                    TestAttempts = 0,
                    TestAverageRam = null,
                    TestCloseOn3 = null,
                    TestCloseOnEscape = null,
                    TestFolderFileNames = null,
                    TestNumExeFiles = null,
                    TestPeakRam = null
                };

                _rdsData.PostTests(newTest);

                return Tuple.Create(newGame, 0);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                CleanUpOnCrash((int)newGame.GameId);
                throw new Exception(e.Message);
            }
        }

        public void PutNewEntry(NewEntry updateEntry)
        {
            Games updateGame = new Games()
            {
                GameId = updateEntry.GameId,
                GameControls = updateEntry.GameControls,
                GameCreatorName = updateEntry.GameCreatorName,
                GameDescription = updateEntry.GameDescription,
                GameGenreAction = updateEntry.GameGenreAction,
                GameGenreAdventure = updateEntry.GameGenreAdventure,
                GameGenreFighting = updateEntry.GameGenreFighting,
                GameGenrePuzzle = updateEntry.GameGenrePuzzle,
                GameGenreRacing = updateEntry.GameGenreRacing,
                GameGenreRhythm = updateEntry.GameGenreRhythm,
                GameGenreRpg = updateEntry.GameGenreRpg,
                GameGenreShooter = updateEntry.GameGenreShooter,
                GameGenreSports = updateEntry.GameGenreSports,
                GameGenreStrategy = updateEntry.GameGenreStrategy,
                GameGenreSurvival = updateEntry.GameGenreSurvival,
                GameGenrePlatformer = updateEntry.GameGenrePlatformer,
                GameName = updateEntry.GameName,
                GamePath = updateEntry.GamePath,
                GameVideolink = updateEntry.GameVideoLink,
                GameOnArcade = false,
                GameStatus = "t",
                GameSubmissionDateUtc = DateTime.UtcNow,
                GameAvailableToDownload = updateEntry.GameAvailableToDownload
            };
            char[] s = new char[5];
            updateGame = InsertArrayToColumn(updateGame, updateEntry);

            try
            {
                _rdsData.PutGames(updateGame);
                Games postedGame = _rdsData.GetGames(updateGame.GameName);

                Submissions updateSubmission = new Submissions()
                {
                    GameId = postedGame.GameId,
                    SubmissionDateUtc = postedGame.GameSubmissionDateUtc,
                    SubmissionImage0 = postedGame.GameImage0,
                    SubmissionName = postedGame.GameName,
                    SubmissionStatus = postedGame.GameStatus,
                    CreatorName = postedGame.GameCreatorName,
                    CreatorEmail = updateEntry.GameCreatorEmail
                };

                _rdsData.PutSubmissions(updateSubmission);

                TestsQueue newTestQueue = new TestsQueue()
                {
                    GameId = updateEntry.GameId,
                    RetryCount = 0
                };

                try
                {
                    _rdsData.DeleteTestsQueue((int)updateEntry.GameId);
                }
                catch(Exception e)
                {
                    _logger.LogCritical(e.Message, e);
                }
                _rdsData.PostTestsQueue(newTestQueue);

                Tests newTest = new Tests()
                {
                    GameId = postedGame.GameId,
                    Test5min = false,
                    TestCloses = false,
                    TestOpens = false,
                    TestAttempts = 0,
                    TestAverageRam = null,
                    TestCloseOn3 = null,
                    TestCloseOnEscape = null,
                    TestFolderFileNames = null,
                    TestNumExeFiles = null,
                    TestPeakRam = null
                };

                try
                {
                    _rdsData.DeleteTests((int)postedGame.GameId);
                }
                catch(Exception e)
                {
                    _logger.LogCritical(e.Message, e);
                }

                _rdsData.PostTests(newTest);

                return;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                CleanUpOnCrash((int)updateEntry.GameId);
                throw new Exception(e.Message);
            }
        }

        ///////
        //// Games Table
        ///////

        public GamesEntry GetGamesEntry(int gameId)
        {
            Games game = _rdsData.GetGames(gameId);
            GamesEntry gameEntry = GamesToGamesEntry(game);
            return gameEntry;
        }

        public GamesEntry GetGamesEntry(string gameName)
        {
            Games game = _rdsData.GetGames(gameName);
            GamesEntry gameEntry = GamesToGamesEntry(game);
            return gameEntry;
        }

        public List<GamesEntry> GetAllGamesEntry()
        {
            List<Games> games = _rdsData.GetAllGames();
            List<GamesEntry> gamesEntry = new List<GamesEntry>();
            foreach(Games game in games)
            {
                gamesEntry.Add(GamesToGamesEntry(game));
            }
            return gamesEntry;
        }

        public List<GamesEntry> GetAllGamesEntryOnArcadeMachine()
        {
            IEnumerable<Games> games = _rdsData.GetAllGames().Where(x => x.GameOnArcade == true);
            List<GamesEntry> gamesEntry = new List<GamesEntry>();
            foreach (Games game in games)
            {
                gamesEntry.Add(GamesToGamesEntry(game));
            }
            return gamesEntry;
        }


        public IEnumerable<GamesEntry> GetRandomApprovedGames(int random)
        {
            List<GamesEntry> games = GetAllGamesEntry().Where(x => x.GameStatus == "a").ToList();
            List<GamesEntry> randomGames = new List<GamesEntry>();
            Random rand = new Random();
            for (int i = 0; i < random; i++)
            {
                int j = rand.Next(games.Count());
                randomGames.Add(games[j]);
                games.RemoveAt(j);
            }
            return randomGames;
        }

        public void PutGamesEntry(GamesEntry gameEntry)
        {
            Games game = GamesEntryToGames(gameEntry);
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

        public void DeleteGamesEntry(int gameId)
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

                try
                {
                    _rdsData.DeleteTestsQueue((int)submission.GameId);
                }
                catch(Exception e)
                {
                    _logger.LogWarning(e.Message, e);
                }

                if (submission.SubmissionStatus == "t")
                {
                    TestsQueue testsQueue = new TestsQueue()
                    {
                        GameId = submission.GameId,
                        RetryCount = 0
                    };
                    _rdsData.PostTestsQueue(testsQueue);
                }

                if (submission.CreatorEmail != null)
                {
                    List<Users> users = _rdsData.GetAllUsers().Where(x => x.Username == submission.CreatorName).ToList();
                    users.Where(x => x.UserEmail != submission.CreatorEmail).ToList().ForEach(x =>
                    {
                        x.UserEmail = submission.CreatorEmail;
                        _rdsData.PutUser(x);
                    });
                }

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

        public void PutTestsQueue(TestsQueue testsQueue)
        {
            _rdsData.PutTestsQueue(testsQueue);

            Tests test = _rdsData.GetTests((int)testsQueue.GameId);
            test.TestAttempts = testsQueue.RetryCount;

            _rdsData.PutTests(test);
            return;
        }

        public void DeleteTestsQueue(int gameId)
        {
            _rdsData.DeleteTestsQueue(gameId);
            return;
        }

        ///////
        //// Users
        ///////
         
        public Users GetUser(string username)
        {
            return _rdsData.GetUser(username);
        }

        public List<Users> GetAllUsers()
        {
            return _rdsData.GetAllUsers();
        }

        public void PostUser(Users user)
        {
            _rdsData.PostUser(user);
            return;
        }

        public void PutUser(Users user)
        {
            _rdsData.PutUser(user);
            if(user.UserEmail != null)
            {
                List<Submissions> submissions = _rdsData.GetAllSubmissions().Where(x => x.CreatorName == user.Username).ToList();
                submissions.Where(x => x.CreatorEmail != user.UserEmail).ToList().ForEach(x =>
                {
                    x.CreatorEmail = user.UserEmail;
                    _rdsData.PutSubmissions(x);
                });
            }

            return;
        }

        ///////
        //// TestingLog
        ///////

        public List<TestingLog> GetAllTestingLogs()
        {
            return _rdsData.GetAllTestingLogs();
        }

        public List<TestingLog> GetTestingLog(int gameId)
        {
            return _rdsData.GetTestingLog(gameId);
        }

        public void PostTestingLog(TestingLog testingLog)
        {
            _rdsData.PostTestingLog(testingLog);
            return;
        }

        ///////
        //// Arcade Machine
        ///////

        public List<ArcadeMachine> GetAllArcadeMachines()
        {
            return _rdsData.GetAllArcadeMachines();
        }

        public ArcadeMachine PostArcadeMachine(ArcadeMachine arcadeMachine)
        {
            return _rdsData.PostArcadeMachine(arcadeMachine);
        }

        public void PutArcadeMachine(ArcadeMachine arcadeMachine)
        {
            _rdsData.PutArcadeMachine(arcadeMachine);
            return;
        }

        public void DeleteArcadeMachine(int arcadeMachine)
        {
            _rdsData.DeleteArcadeMachine(arcadeMachine);
            return;
        }

        ///Helper functions///

        public GamesEntry GamesToGamesEntry(Games game)
        {
            GamesEntry gameEntry = new GamesEntry()
            {
                GameControls = game.GameControls,
                GameCreatorName = game.GameCreatorName,
                GameDescription = game.GameDescription,
                GameGenreSurvival = game.GameGenreSurvival,
                GameGenreStrategy = game.GameGenreStrategy,
                GameGenreSports = game.GameGenreSports,
                GameGenreAction = game.GameGenreAction,
                GameGenreAdventure = game.GameGenreAdventure,
                GameGenreFighting = game.GameGenreFighting,
                GameGenrePuzzle = game.GameGenrePuzzle,
                GameGenreRacing = game.GameGenreRacing,
                GameGenreRpg = game.GameGenreRpg,
                GameGenreRhythm = game.GameGenreRhythm,
                GameGenreShooter = game.GameGenreShooter,
                GameGenrePlatformer = game.GameGenrePlatformer,
                GameId = game.GameId,
                GameName = game.GameName,
                GameOnArcade = game.GameOnArcade,
                GamePath = game.GamePath,
                GameReviewDateUtc = game.GameReviewDateUtc,
                GameStatus = game.GameStatus,
                GameSubmissionDateUtc = game.GameSubmissionDateUtc,
                GameVideolink = game.GameVideolink,
                GameImg = ValidGameImageURLs(game),
                GameAvailableToDownload = game.GameAvailableToDownload
            };

            return gameEntry;
        }

        public Games GamesEntryToGames(GamesEntry gameEntry)
        {
            Games game = new Games()
            {
                GameControls = gameEntry.GameControls,
                GameCreatorName = gameEntry.GameCreatorName,
                GameDescription = gameEntry.GameDescription,
                GameGenreSurvival = gameEntry.GameGenreSurvival,
                GameGenreStrategy = gameEntry.GameGenreStrategy,
                GameGenreSports = gameEntry.GameGenreSports,
                GameGenreAction = gameEntry.GameGenreAction,
                GameGenreAdventure = gameEntry.GameGenreAdventure,
                GameGenreFighting = gameEntry.GameGenreFighting,
                GameGenrePuzzle = gameEntry.GameGenrePuzzle,
                GameGenreRacing = gameEntry.GameGenreRacing,
                GameGenreRpg = gameEntry.GameGenreRpg,
                GameGenreRhythm = gameEntry.GameGenreRhythm,
                GameGenreShooter = gameEntry.GameGenreShooter,
                GameGenrePlatformer = gameEntry.GameGenrePlatformer,
                GameId = gameEntry.GameId,
                GameName = gameEntry.GameName,
                GameOnArcade = gameEntry.GameOnArcade,
                GamePath = gameEntry.GamePath,
                GameReviewDateUtc = gameEntry.GameReviewDateUtc,
                GameStatus = gameEntry.GameStatus,
                GameSubmissionDateUtc = gameEntry.GameSubmissionDateUtc,
                GameVideolink = gameEntry.GameVideolink,
                GameAvailableToDownload = gameEntry.GameAvailableToDownload,
            };

            game = InsertArrayToColumn(game, gameEntry);

            return game;
        }

        public Games InsertArrayToColumn(Games game, NewEntry newEntry)
        {
            int size = newEntry.GameImg.Count();
            switch (size)
            {
                case 1:
                    game.GameImage0 = newEntry.GameImg[0];
                    break;
                case 2:
                    game.GameImage0 = newEntry.GameImg[0];
                    game.GameImage1 = newEntry.GameImg[1];
                    break;
                case 3:
                    game.GameImage0 = newEntry.GameImg[0];
                    game.GameImage1 = newEntry.GameImg[1];
                    game.GameImage2 = newEntry.GameImg[2];
                    break;
                case 4:
                    game.GameImage0 = newEntry.GameImg[0];
                    game.GameImage1 = newEntry.GameImg[1];
                    game.GameImage2 = newEntry.GameImg[2];
                    game.GameImage3 = newEntry.GameImg[3];
                    break;
                case 5:
                    game.GameImage0 = newEntry.GameImg[0];
                    game.GameImage1 = newEntry.GameImg[1];
                    game.GameImage2 = newEntry.GameImg[2];
                    game.GameImage3 = newEntry.GameImg[3];
                    game.GameImage4 = newEntry.GameImg[4];
                    break;
                default:
                    break;
            }
            return game;
        }

        public Games InsertArrayToColumn(Games game, GamesEntry newEntry)
        {
            try
            {
                int size = newEntry.GameImg.Count();
                switch (size)
                {
                    case 1:
                        game.GameImage0 = newEntry.GameImg[0];
                        break;
                    case 2:
                        game.GameImage0 = newEntry.GameImg[0];
                        game.GameImage1 = newEntry.GameImg[1];
                        break;
                    case 3:
                        game.GameImage0 = newEntry.GameImg[0];
                        game.GameImage1 = newEntry.GameImg[1];
                        game.GameImage2 = newEntry.GameImg[2];
                        break;
                    case 4:
                        game.GameImage0 = newEntry.GameImg[0];
                        game.GameImage1 = newEntry.GameImg[1];
                        game.GameImage2 = newEntry.GameImg[2];
                        game.GameImage3 = newEntry.GameImg[3];
                        break;
                    case 5:
                        game.GameImage0 = newEntry.GameImg[0];
                        game.GameImage1 = newEntry.GameImg[1];
                        game.GameImage2 = newEntry.GameImg[2];
                        game.GameImage3 = newEntry.GameImg[3];
                        game.GameImage4 = newEntry.GameImg[4];
                        break;
                    default:
                        break;
                }
            }
            catch(Exception e)
            {
                _logger.LogCritical(e.Message, e);
            }

            return game;
        }

        public string[] ValidGameImageURLs(Games game)
        {
            int count = 0;
            if (game.GameImage0 != null && game.GameImage0 != "null" && game.GameImage0 != "")
            { count++; }
            if (game.GameImage1 != null && game.GameImage1 != "null" && game.GameImage1 != "")
            { count++; }
            if (game.GameImage2 != null && game.GameImage2 != "null" && game.GameImage2 != "")
            { count++; }
            if (game.GameImage3 != null && game.GameImage3 != "null" && game.GameImage3 != "")
            { count++; }
            if (game.GameImage4 != null && game.GameImage4 != "null" && game.GameImage4 != "")
            { count++; }

            string[] stringArr = new string[count];

            count = 0;
            if (game.GameImage0 != null && game.GameImage0 != "null" && game.GameImage0 != "")
            {
                stringArr[count] = game.GameImage0;
                count++;
            }
            if (game.GameImage1 != null && game.GameImage1 != "null" && game.GameImage1 != "")
            {
                stringArr[count] = game.GameImage1;
                count++;
            }
            if (game.GameImage2 != null && game.GameImage2 != "null" && game.GameImage2 != "")
            {
                stringArr[count] = game.GameImage2;
                count++;
            }
            if (game.GameImage3 != null && game.GameImage3 != "null" && game.GameImage3 != "")
            {
                stringArr[count] = game.GameImage3;
                count++;
            }
            if (game.GameImage4 != null && game.GameImage4 != "null" && game.GameImage4 != "")
            {
                stringArr[count] = game.GameImage4;
                count++;
            }

            return stringArr;
        }

        public void CleanUpOnCrash(int gameId)
        {
            try
            {
                _rdsData.DeleteGames(gameId);
            }
            catch(Exception e)
            {
                _logger.LogCritical(e.Message, e);
            }

            try
            {
                _rdsData.DeleteSubmissions(gameId);
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message, e);
            }

            try
            {
                _rdsData.DeleteTests(gameId);
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message, e);
            }

            try
            {
                _rdsData.DeleteTestsQueue(gameId);
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message, e);
            }
        }
    }
}
