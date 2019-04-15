using KnightsArcade.Infrastructure.Data.Interface;
using KnightsArcade.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Data
{
    public class SMTPData : ISMTPData
    {
        private readonly ILogger<SMTPData> _logger;
        private readonly SmtpClient _client;

        public SMTPData (ILogger<SMTPData> logger, IConfiguration configuration)
        {
            _logger = logger;
            _client = new SmtpClient("smtp.gmail.com")
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(configuration.GetSection("Email:Username").Value, configuration.GetSection("Email:Password").Value)
            };
        }

        public void SendEmail(Email message)
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(message.From);
            mailMessage.To.Add(message.To);
            mailMessage.Body = message.Body;
            mailMessage.Subject = message.Subject;
            _client.Send(mailMessage);
        }
    }
}
