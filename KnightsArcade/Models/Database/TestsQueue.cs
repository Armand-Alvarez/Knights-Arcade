using System.ComponentModel.DataAnnotations;

namespace KnightsArcade.Models.Database
{
    public partial class TestsQueue
    {
        [Required]
        public int? GameId { get; set; }
        public int? RetryCount { get; set; }
    }
}
