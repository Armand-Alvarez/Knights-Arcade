using Auto_Testing.Infrastructure.Logic;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auto_Testing.Controllers
{
	[Microsoft.AspNetCore.Mvc.Route("api/v1/[controller]")]
	[ApiController]
	public class Auto_TestingController : ControllerBase
	{
		private readonly ILogger<Auto_TestingController> _logger;
		private readonly TestingLogic _testingLogic;

		public Auto_TestingController(ILogger<Auto_TestingController> logger, TestingLogic testingLogic)
		{
			_logger = logger;
			_testingLogic = testingLogic;
		}

		[HttpGet("info")]
		public IActionResult Get()
		{
			//_testingLogic.RunAllEntryTests();
			return Ok("Runs automated testing for Knights Arcade games.");
		}

	}
}
