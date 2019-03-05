using System.ComponentModel.DataAnnotations;

namespace KnightsArcade.Models.Database
{
    public partial class Tests
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
