using Amazon;
using Amazon.EC2;
using Amazon.EC2.Model;
using KnightsArcade.Infrastructure.Data.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Data
{
    public class EC2Data : IEC2Data
    {
        private readonly ILogger<EC2Data> _logger;
        private readonly AmazonEC2Client _ec2Client;
        private readonly IConfiguration _configuration;
        private static readonly RegionEndpoint ec2Region = RegionEndpoint.USEast2;

        public EC2Data(ILogger<EC2Data> logger, IConfiguration config)
        {
            _logger = logger;
            _configuration = config;
            _ec2Client = new AmazonEC2Client(config.GetSection("ConnectionStrings:AWSAK").Value,
                config.GetSection("ConnectionStrings:AWSSK").Value, ec2Region);
        }

        public void StartAutomatedTestingEC2()
        {
            try
            {
                List<string> instanceIds = new List<string>()
                {
                    _configuration.GetConnectionString("EC2ID")
                };
                StartInstancesRequest startInstanceRequest = new StartInstancesRequest(instanceIds);
                StartInstancesResponse x = _ec2Client.StartInstancesAsync(startInstanceRequest).Result;
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
            }
        }

        public void StopAutomatedTestingEC2()
        {
            try
            {
                List<string> instanceIds = new List<string>()
                {
                    _configuration.GetConnectionString("EC2ID")
                };
                StopInstancesRequest stopInstanceRequest = new StopInstancesRequest(instanceIds);
                StopInstancesResponse x = _ec2Client.StopInstancesAsync(stopInstanceRequest).Result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
            }
        }
    }
}
