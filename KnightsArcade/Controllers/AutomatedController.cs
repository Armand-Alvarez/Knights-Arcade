using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnightsArcade.Infrastructure.Logic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KnightsArcade.Controllers
{
    //[Route("api/v1/[controller]")]
    //[ApiController]
    //public class AutomatedController : ControllerBase
    //{
    //    private readonly RDSLogic _rdsLogic;
    //    private readonly EC2Logic _ec2Logic;
    //    private readonly ILogger<AutomatedController> _logger;

    //    public AutomatedController(ILogger<AutomatedController> logger, RDSLogic rdsLogic, EC2Logic ec2Logic)
    //    {
    //        _rdsLogic = rdsLogic;
    //        _ec2Logic = ec2Logic;
    //        _logger = logger;
    //    }

    //    /// <summary>
    //    /// Start EC2 for automated testing.
    //    /// </summary>
    //    /// <returns></returns>
    //    /// <response code="200">Success.</response> 
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error starting EC2.</response> 
    //    [HttpPut("aws/ec2/start")]
    //    public IActionResult PutStartAutomatedTestingEC2(bool start)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);
    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _ec2Logic.StartAutomatedTestingEC2();
    //                return Ok();
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500);
    //        }
    //    }

    //    /// <summary>
    //    /// Stop EC2 for automated testing.
    //    /// </summary>
    //    /// <returns></returns>
    //    /// <response code="200">Success.</response>  
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error stopping EC2.</response> 
    //    [HttpPut("aws/ec2/stop")]
    //    public IActionResult PutStopAutomatedTestingEC2(bool stop)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);
    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _ec2Logic.StopAutomatedTestingEC2();
    //                return Ok();
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500);
    //        }
    //    }

    //    /// <summary>
    //    /// Updates the object in the Games database table.
    //    /// </summary>
    //    /// <remarks>
    //    /// REQUIRED: gameId.
    //    /// 
    //    /// Fields left in null are ignored when updating a database column for an entry. 
    //    /// Using this endpoint also updates its entry corresponding columns in the submissions table.
    //    /// You CANNOT update: gameId, gameName, gameCreatorId, gameCreatorName, gameSubmissionDateUtc fields.
    //    /// 
    //    /// Example
    //    /// PUT
    //    /// {
    //    ///     "gameId" : "5",
    //    ///     "gameName" : "Cool Guns 9001",
    //    ///     "gameCreatorId" : null,
    //    ///     "gameCreatorName" : "Zak",
    //    ///     "gameDescription" : "This game is the dopest.",
    //    ///     "gameControls" : "LOL figure it out.",
    //    ///     "gameVideoLink" : null,
    //    ///     "gameGenres" : null,
    //    ///     "gameStatus" : null,
    //    ///     "gameOnArcade" : null,
    //    ///     "gamePath" : null,
    //    ///     "gameImage0" : null,
    //    ///     "gameImage1" : null,
    //    ///     "gameImage2" : "somefakeurl.com/cool_math.jpeg",
    //    ///     "gameImage3" : null,
    //    ///     "gameImage4" : null,
    //    ///     "gameSubmissionsDateUtc" : null,
    //    ///     "gameReviewDateUtc" : null
    //    /// }
    //    /// -- In this example only the gameDescription, gameControls and gameImage2 columns will be updated for the entry in the database.
    //    /// </remarks>
    //    /// <param name="game"></param>
    //    /// <returns></returns>
    //    /// <response code="200">Success.</response>
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error.</response>  
    //    [HttpPut("rds/games/game")]
    //    [ProducesResponseType(200)]
    //    [ProducesResponseType(401)]
    //    [ProducesResponseType(403)]
    //    [ProducesResponseType(500)]
    //    public IActionResult PutGames(GamesEntry game)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);
    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _rdsLogic.PutGamesEntry(game);
    //                return Ok();
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500, e.Message);
    //        }
    //    }

    //    /// <summary>
    //    /// Updates the object in the Tests database table.
    //    /// </summary>
    //    /// <remarks>
    //    /// REQUIRED: gameId.
    //    /// 
    //    /// Fields left in null are ignored when updating a database column for an entry. 
    //    /// You CANNOT update: gameId. 
    //    /// </remarks>
    //    /// <param name="test"></param>
    //    /// <returns></returns>
    //    /// <response code="200">Success.</response>
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error.</response>  
    //    [HttpPut("rds/tests/test")]
    //    [ProducesResponseType(200)]
    //    [ProducesResponseType(401)]
    //    [ProducesResponseType(403)]
    //    [ProducesResponseType(500)]
    //    public IActionResult PutTests([FromBody] Tests test)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);
    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _rdsLogic.PutTests(test);
    //                return Ok();
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500, e.Message);
    //        }
    //    }

    //    /// <summary>
    //    /// Updates the object retryCount column by one in the TestsQueue database table.
    //    /// </summary>
    //    /// <remarks>
    //    /// Only updates the retryCount column by one.
    //    /// </remarks>
    //    /// <param name="testsQueue"></param>
    //    /// <returns></returns>
    //    /// <response code="200">Success.</response>
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error.</response>  
    //    [HttpPut("rds/testsqueue/testqueue")]
    //    [ProducesResponseType(200)]
    //    [ProducesResponseType(401)]
    //    [ProducesResponseType(403)]
    //    [ProducesResponseType(500)]
    //    public IActionResult PutTestsQueue([FromBody] TestsQueue testsQueue)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);

    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _rdsLogic.PutTestsQueue(testsQueue);
    //                return Ok();
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500, e.Message);
    //        }
    //    }

    //    /// <summary>
    //    /// Deletes the object in the TestsQueue database table.
    //    /// </summary>
    //    /// <param name="gameId"></param>
    //    /// <returns></returns>
    //    /// <response code="204">No Content.</response>
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error.</response>  
    //    [HttpDelete("rds/testsqueue/testqueue")]
    //    [ProducesResponseType(204)]
    //    [ProducesResponseType(401)]
    //    [ProducesResponseType(403)]
    //    [ProducesResponseType(500)]
    //    public IActionResult DeleteTestsQueue(int gameId)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);
    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _rdsLogic.DeleteTestsQueue(gameId);
    //                return NoContent();
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500, e.Message);
    //        }
    //    }

    //    /// <summary>
    //    /// Adds the testing log to the testing log table.
    //    /// </summary>
    //    /// <param name="testingLog"></param>
    //    /// <returns></returns>
    //    /// <response code="201">Created.</response>
    //    /// <response code="401">Empty or no authorization header.</response>
    //    /// <response code="403">Invalid access token given.</response>
    //    /// <response code="500">Error.</response>  
    //    [HttpPost("rds/testinglog/testinglog")]
    //    [ProducesResponseType(201)]
    //    [ProducesResponseType(401)]
    //    [ProducesResponseType(403)]
    //    [ProducesResponseType(500)]
    //    public IActionResult PostTestingLog(TestingLog testingLog)
    //    {
    //        try
    //        {
    //            StringValues accessToken = new StringValues();
    //            Request.Headers.TryGetValue("Authorization", out accessToken);
    //            if (accessToken.Count() == 0)
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (accessToken.FirstOrDefault().ToString() == null || accessToken.FirstOrDefault().ToString() == "")
    //            {
    //                return StatusCode(401, "Empty or no authorization header.");
    //            }

    //            if (_validation.CheckValidation(accessToken.ToString()))
    //            {
    //                _rdsLogic.PostTestingLog(testingLog);
    //                return StatusCode(201);
    //            }

    //            return StatusCode(403, "This is an invalid access token.");
    //        }
    //        catch (Exception e)
    //        {
    //            _logger.LogError(e.Message, e);
    //            return StatusCode(500, e.Message);
    //        }
    //    }
    //}
}