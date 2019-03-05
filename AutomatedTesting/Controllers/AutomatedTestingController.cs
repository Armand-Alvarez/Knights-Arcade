using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutomatedTesting.Infrastructure.Logic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AutomatedTesting.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AutomatedTestingController : ControllerBase
    {
        private readonly ILogger<AutomatedTestingController> _logger;
        private readonly TestingLogic _testingLogic;

        public AutomatedTestingController(ILogger<AutomatedTestingController> logger, TestingLogic testingLogic)
        {
            _logger = logger;
            _testingLogic = testingLogic;

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello");
        }

        [HttpGet("testgame")]
        public IActionResult GetGame()
        {
            try
            {
                _testingLogic.Start();
                return Ok();

            }

            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500);
            }
        }

        [HttpGet("basictest")]
        public IActionResult PostAutomatedTest()

        {
            try
            {
                _testingLogic.Start();
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500);
            }
        }

        [HttpGet("s3/game")]
        public IActionResult GetGame(string gameName)
        {
            try
            {
                //object x = await _s3Data.ReadObjectDataAsync("arcadegrassproject", "arcade_games", gameName);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                return StatusCode(500, e.Message);
            }
        }
    }
}