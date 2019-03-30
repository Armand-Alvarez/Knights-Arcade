using KnightsArcade.Infrastructure.Data.Interface;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Logic
{
    public class EC2Logic
    {
        private readonly ILogger<EC2Logic> _logger;
        private readonly IEC2Data _ec2Data;

        public EC2Logic(ILogger<EC2Logic> logger, IEC2Data ec2Data)
        {
            _logger = logger;
            _ec2Data = ec2Data;
        }

        public void StartAutomatedTestingEC2()
        {
            _ec2Data.StartAutomatedTestingEC2();
            return;
        }

        public void StopAutomatedTestingEC2()
        {
            _ec2Data.StopAutomatedTestingEC2();
            return;
        }
    }
}
