using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatedTesting.Models
{
    public class Tests
    {
        [Required]
        public int? GameId { get; set; }
        public sbyte? TestOpens { get; set; }
        public sbyte? Test5min { get; set; }
        public sbyte? TestCloses { get; set; }
        public sbyte? TestRandombuttons { get; set; }
        public int? TestAttempts { get; set; }
    }
}
