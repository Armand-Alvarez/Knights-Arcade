using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnightsArcade.Infrastructure.Logic;
using KnightsArcade.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KnightsArcade.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PublicController : Controller
    {
        private readonly RDSLogic _rdsLogic;
        private readonly ILogger<PublicController> _logger;

        public PublicController(RDSLogic rdsLogic, ILogger<PublicController> logger)
        {
            _rdsLogic = rdsLogic;
            _logger = logger;
        }

        /// <summary>
        /// Gets info of controller.
        /// </summary>
        /// <returns></returns>
        [HttpGet("info")]
        public IActionResult GetInfo()
        {
            return Ok("Knights Arcade Public");
        }

        /// <summary>
        /// Get a single game from the Games database table by id.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>Single game entry from the Games database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/gamesbyid")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetGamesById(int gameId)
        {
            try
            {
                return Ok(_rdsLogic.GetGames(gameId));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get a single game from the Games database table by name.
        /// </summary>
        /// <param name="gameName"></param>
        /// <returns>Single game entry from the Games database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/gamesbyname")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetGamesByName(string gameName)
        {
            try
            {
                return Ok(_rdsLogic.GetGames(gameName));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all games from the Games database table.
        /// </summary>
        /// <returns>All game entries from the Games database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/allgames")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllGames()
        {
            try
            {
                return Ok(_rdsLogic.GetAllGames());
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all approved games for the arcade machine from the Games database table.
        /// </summary>
        /// <returns>All game entries from the Games database table that are marked true for arcade machine.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/allgamesonarcademachine")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllGamesOnArcadeMachine()
        {
            try
            {
                return Ok(_rdsLogic.GetAllGamesOnArcadeMachine());
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all accepted games from the Games database table.
        /// </summary>
        /// <returns>All game entries from the Games database table that are marked "a" on game_status column for Accepted.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/allapprovedgames")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllApprovedGames()
        {
            try
            {
                return Ok(_rdsLogic.GetAllGames().Where(x => x.GameStatus == "a"));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get random accepted games from the Games database table.
        /// </summary>
        /// <returns>Get random game entries from the Games database table that are marked "a" on game_status column for Accepted.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/randomgamesapproved")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetRandomApprovedGames(int random)
        {
            try
            {
                return Ok(_rdsLogic.GetRandomApprovedGames(random));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all pending games from the Games database table.
        /// </summary>
        /// <returns>All game entries from the Games database table that are marked "p" on game_status column for Pending.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/allpendinggames")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllPendingGames()
        {
            try
            {
                return Ok(_rdsLogic.GetAllGames().Where(x => x.GameStatus == "p"));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all testing games from the Games database table.
        /// </summary>
        /// <returns>All game entries from the Games database table that are marked "t" on game_status column for Testing.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/alltestinggames")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllTestingGames()
        {
            try
            {
                return Ok(_rdsLogic.GetAllGames().Where(x => x.GameStatus == "t"));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all rejected games from the Games database table.
        /// </summary>
        /// <returns>All game entries from the Games database table that are marked "r" on game_status column for Rejected.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/games/allgamesrejected")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllRejectedGames()
        {
            try
            {
                return Ok(_rdsLogic.GetAllGames().Where(x => x.GameStatus == "r"));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get a single game from the Submissions table by id.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>Single submission entry from the Submissions database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/submissions/submissionsbyid")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetSubmissiosnById(int gameId)
        {
            try
            {
                return Ok(_rdsLogic.GetSubmissions(gameId));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all submissions from the Submissions database table.
        /// </summary>
        /// <returns>All submission entries from the Submissions database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/submissions/allsubmissions")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllSubmissions()
        {
            try
            {
                return Ok(_rdsLogic.GetAllSubmissions());
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all developer/creator submissions from the Submissions database table.
        /// </summary>
        /// <returns>All game entries from the Submissions database table that are marked with the given creator name on game_creator_name column for Accepted.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/submissions/allcreatorsubmissions")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllCreatorGames(string developerName)
        {
            try
            {
                return Ok(_rdsLogic.GetAllGames().Where(x => x.GameCreatorName == developerName));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get a single test from the Tests database table by id.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>Single test entry from the Tests database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/tests/testsbygameid")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetTestsByGameId(int gameId)
        {
            try
            {
                return Ok(_rdsLogic.GetTests(gameId));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all tests from the Tests database table.
        /// </summary>
        /// <returns>All test entries from the Tests database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/tests/alltests")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllTests()
        {
            try
            {
                return Ok(_rdsLogic.GetAllTests());
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get a single testqueue from the TestsQueue database table by id.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>Single testsqueue entry from the TestsQueue database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/testsqueue/testsqueuebyid")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetTestsQueueById(int gameId)
        {
            try
            {
                return Ok(_rdsLogic.GetTestsQueue(gameId));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get the first testqueue from the TestsQueue database table.
        /// </summary>
        /// <returns>First testqueue entry from the TestsQueue database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/testsqueue/firsttestsqueue")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetFirstTestsQueue()
        {
            try
            {
                return Ok(_rdsLogic.GetTestsQueue());
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all testsqueue from the TestsQueue database table.
        /// </summary>
        /// <returns>All testqueue entries from TestsQueue database table.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/testsqueue/alltestsqueue")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetAllTestsQueue()
        {
            try
            {
                return Ok(_rdsLogic.GetAllTestsQueue());
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get a user profile info.
        /// </summary>
        /// <returns>A user profile info.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpGet("rds/users/user")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult GetUser(string username)
        {
            try
            {
                return Ok(_rdsLogic.GetUser(username));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get a testing log for a specific game.
        /// </summary>
        /// <returns>A user profile info.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [HttpGet("rds/testinglog/testinglog")]
        public IActionResult GetTestingLog(int gameId)
        {
            try
            {
                return Ok(_rdsLogic.GetTestingLog(gameId));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all testing logs.
        /// </summary>
        /// <returns>A user profile info.</returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [HttpGet("rds/testinglog/alltestinglogs")]
        public IActionResult GetAllTestingLogs()
        {
            try
            {
                return Ok(_rdsLogic.GetAllTestingLogs());
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }
    }
}
