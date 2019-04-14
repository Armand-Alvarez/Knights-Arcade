using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Automated_Testing.Controllers
{
    /*
    public class Automated_TestingController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
    */

    [Microsoft.AspNetCore.Mvc.Route("api/v1/[controller]")]
    [ApiController]
    public class AutomatedTestingController : ControllerBase
    {
        private readonly ILogger<AutomatedTestingController> _logger;

        public AutomatedTestingController(ILogger<AutomatedTestingController> logger)
        {
            _logger = logger;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("info")]
        public IActionResult Get()
        {
            //_testingLogic.RunAllEntryTests();
            return Ok("Runs automated testing for Knights Arcade games.");
        }
    }
}