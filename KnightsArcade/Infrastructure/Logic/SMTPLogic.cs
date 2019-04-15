using KnightsArcade.Infrastructure.Data.Interface;
using KnightsArcade.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Logic
{
    public class SMTPLogic
    {
        private readonly ILogger<SMTPLogic> _logger;
        private readonly ISMTPData _smtpData;

        public SMTPLogic (ILogger<SMTPLogic> logger, ISMTPData smtpData)
        {
            _logger = logger;
            _smtpData = smtpData;
        }

        public void SendEmail(Email message)
        {
            _smtpData.SendEmail(message);
        }
    }
}
