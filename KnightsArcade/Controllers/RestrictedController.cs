using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnightsArcade.Infrastructure.Logic;
using KnightsArcade.Models;
using KnightsArcade.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KnightsArcade.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RestrictedController : Controller
    {
        private readonly RDSLogic _rdsLogic;
        private readonly ILogger<RestrictedController> _logger;

        public RestrictedController(RDSLogic rdsLogic, ILogger<RestrictedController> logger)
        {
            _rdsLogic = rdsLogic;
            _logger = logger;
        }

        /// <summary>
        /// Get info of controller.
        /// </summary>
        /// <returns></returns>
        [HttpGet("info")]
        public IActionResult GetInfo()
        {
            return Ok("Knights Arcade Restricted");
        }

        /// <summary>
        /// Creates the new entry in all 4 database tables: Games, Submissions, Tests, and TestsQueue.
        /// </summary>
        /// <remarks>
        /// The only way to post to a database table is through this method. You can only post to all tables.
        /// </remarks>
        /// <param name="newEntry"></param>
        /// <returns></returns>
        /// <response code="201">Created.</response>
        /// <response code="409">Duplicate gameName entry.</response>  
        /// <response code="500">Error.</response>  
        [HttpPost("rds/newentry")]
        [ProducesResponseType(201)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult PostNewEntry([FromBody] NewEntry newEntry)
        {
            try
            {
                Tuple<Games, int> tuple = _rdsLogic.PostNewEntry(newEntry);
                if(tuple.Item2 == 1)
                {
                    return StatusCode(409, "That game name already exists.");
                }
                return StatusCode(201, tuple.Item1);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Updates the object in the Games database table.
        /// </summary>
        /// <remarks>
        /// REQUIRED: gameId.
        /// 
        /// Fields left in null are ignored when updating a database column for an entry. 
        /// Using this endpoint also updates its entry corresponding columns in the submissions table.
        /// You CANNOT update: gameId, gameName, gameCreatorId, gameCreatorName, gameSubmissionDateUtc fields.
        /// 
        /// Example
        /// PUT
        /// {
        ///     "gameId" : "5",
        ///     "gameName" : "Cool Guns 9001",
        ///     "gameCreatorId" : null,
        ///     "gameCreatorName" : "Zak",
        ///     "gameDescription" : "This game is the dopest.",
        ///     "gameControls" : "LOL figure it out.",
        ///     "gameVideoLink" : null,
        ///     "gameGenres" : null,
        ///     "gameStatus" : null,
        ///     "gameOnArcade" : null,
        ///     "gamePath" : null,
        ///     "gameImage0" : null,
        ///     "gameImage1" : null,
        ///     "gameImage2" : "somefakeurl.com/cool_math.jpeg",
        ///     "gameImage3" : null,
        ///     "gameImage4" : null,
        ///     "gameSubmissionsDateUtc" : null,
        ///     "gameReviewDateUtc" : null
        /// }
        /// -- In this example only the gameDescription, gameControls and gameImage2 columns will be updated for the entry in the database.
        /// </remarks>
        /// <param name="game"></param>
        /// <returns></returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpPut("rds/games/game")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult PutGames([FromBody] GamesEntry game)
        {
            try
            {
                _rdsLogic.PutGames(game);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Deletes the object in the Games database table.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="500"></response>  
        [HttpDelete("rds/games/game")]
        [ProducesResponseType(204)]
        [ProducesResponseType(500)]
        public IActionResult DeleteGames(int gameId)
        {
            try
            {
                _rdsLogic.DeleteGames(gameId);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Updates the object in the Submissions database table.
        /// </summary>
        /// <remarks>
        /// REQUIRED: gameId.
        /// 
        /// Fields left in null are ignored when updating a database column for an entry. 
        /// Using this endpoint also updates its entry corresponding columns in the games table, if it exists.
        /// You CANNOT update: creatorId, gameId, submissionName, submissionDateUtc fields.
        /// 
        /// Example
        /// PUT
        /// {
        ///     "creatorId" : null,
        ///     "gameId" : "5",
        ///     "submissionName" : "StarCraft",
        ///     "submissionStatus" : null,
        ///     "submissionImage0" : "somefakeurl.com/image_of_cat.png",
        ///     "submissionDateUtc" : "2009-06-01T13:45:30",
        ///     "submissionReviewDateUtc" : null
        /// }
        /// -- In this example only the submissionImage0 column will be updated for the entry in the database.
        /// </remarks>
        /// <example>
        /// </example>
        /// <param name="submission"></param>
        /// <returns></returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpPut("rds/submissions/submission")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult PutSubmissions([FromBody] Submissions submission)
        {
            try
            {
                _rdsLogic.PutSubmissions(submission);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Updates the object in the Tests database table.
        /// </summary>
        /// <remarks>
        /// REQUIRED: gameId.
        /// 
        /// Fields left in null are ignored when updating a database column for an entry. 
        /// You CANNOT update: gameId. 
        /// </remarks>
        /// <param name="test"></param>
        /// <returns></returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpPut("rds/tests/test")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult PutTests([FromBody] Tests test)
        {
            try
            {
                _rdsLogic.PutTests(test);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Updates the object retryCount column by one in the TestsQueue database table.
        /// </summary>
        /// <remarks>
        /// Only updates the retryCount column by one.
        /// </remarks>
        /// <param name="testsQueue"></param>
        /// <returns></returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpPut("rds/testsqueue/testqueue")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult PutTestsQueue([FromBody] TestsQueue testsQueue)
        {
            try
            {
                _rdsLogic.PutTestsQueue((int)testsQueue.GameId);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Deletes the object in the TestsQueue database table.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="500"></response>  
        [HttpDelete("rds/testsqueue/testqueue")]
        [ProducesResponseType(204)]
        [ProducesResponseType(500)]
        public IActionResult DeleteTestsQueue(int gameId)
        {
            try
            {
                _rdsLogic.DeleteTestsQueue(gameId);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Adds the user to the users table.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <response code="201"></response>
        /// <response code="500"></response>  
        [HttpPost("rds/users/user")]
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        public IActionResult PostUser([FromBody] Users user)
        {
            try
            {
                _rdsLogic.PostUser(user);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Updates the user to the users table.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <response code="200"></response>
        /// <response code="500"></response>  
        [HttpPut("rds/users/user")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult PutUser([FromBody] Users user)
        {
            try
            {
                _rdsLogic.PutUser(user);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Adds the testing log to the testing log table.
        /// </summary>
        /// <param name="testingLog"></param>
        /// <returns></returns>
        /// <response code="201"></response>
        /// <response code="500"></response>  
        [HttpPost("rds/testinglog/testinglog")]
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        public IActionResult PostTestingLog([FromBody] TestingLog testingLog)
        {
            try
            {
                _rdsLogic.PostTestingLog(testingLog);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }
    }
}