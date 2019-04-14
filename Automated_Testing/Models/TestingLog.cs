using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Automated_Testing.Models
{
    public partial class TestingLog
    {
        public int? GameId { get; set; }
        public int TestlogAttempt { get; set; }
        public string TestlogLog { get; set; }
        public DateTime TestlogDatetimeUtc { get; set; }
    }
}
