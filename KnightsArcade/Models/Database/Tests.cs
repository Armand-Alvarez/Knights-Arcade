using System.ComponentModel.DataAnnotations;

namespace KnightsArcade.Models.Database
{
    public partial class Tests
    {
        [Required]
        public int? GameId { get; set; }
        public bool? TestOpens { get; set; }
        public bool? Test5min { get; set; }
        public bool? TestCloses { get; set; }
        public bool? TestRandombuttons { get; set; }
        public int? TestAttempts { get; set; }
    }
}
