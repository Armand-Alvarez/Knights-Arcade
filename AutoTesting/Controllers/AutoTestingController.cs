using AutoTesting.Infrastructure.Logic;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace AutoTesting.Controllers
{
    public class AutoTestingController : ApiController
    {
        private readonly ILogger<AutoTestingController> _logger;
        private readonly TestingLogic _testingLogic;
        
        public AutoTestingController(ILogger<AutoTestingController> logger, TestingLogic testingLogic)
        {
            _logger = logger;
            _testingLogic = testingLogic;
        }

        public string Get()
        {
            _testingLogic.RunAllEntryTests();
            return "Runs automated testing for Knights Arcade games.";
        }

    }
}
