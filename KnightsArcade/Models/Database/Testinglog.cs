using System;
using System.Collections.Generic;

namespace KnightsArcade.Models.Database
{
    public partial class TestingLog
    {
        public int? GameId { get; set; }
        public int TestlogAttempt { get; set; }
        public string TestlogLog { get; set; }
        public DateTime? TestlogDatetimeUtc { get; set; }
    }
}
