using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnightsArcade.Infrastructure.Logic;
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
    }
}
