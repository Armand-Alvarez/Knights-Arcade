using System.ComponentModel.DataAnnotations;

namespace AutomatedTesting.Models
{
    public partial class TestsQueue
    {
        [Required]
        public int? GameId { get; set; }
        public int? RetryCount { get; set; }
    }
}
