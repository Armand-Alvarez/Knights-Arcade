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

        public AutomatedTestingController(ILogger<AutomatedTestingController> logger)
        {
            _logger = logger;
        }

        [HttpGet("info")]
        public IActionResult Get()
        {
            //_testingLogic.RunAllEntryTests();
            return Ok("Runs automated testing for Knights Arcade games.");
        }
    }
}