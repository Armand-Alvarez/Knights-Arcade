using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Automated_Testing.Models
{
    public partial class TestsQueue
    {
        [Required]
        public int? GameId { get; set; }
        public int? RetryCount { get; set; }
    }
}
