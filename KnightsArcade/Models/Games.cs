using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Models
{
    public partial class Games
    {
        [Required]
        public int? GameId { get; set; }
        public string GameName { get; set; }
        public int GameCreatorId { get; set; }
        public string GameCreatorName { get; set; }
        public string GameDescription { get; set; }
        public string GameControls { get; set; }
        public string GameVideolink { get; set; }
        public string GameGenres { get; set; }
        public string GameStatus { get; set; }
        public bool GameOnArcade { get; set; }
        public string GamePath { get; set; }
        public string GameImage0 { get; set; }
        public string GameImage1 { get; set; }
        public string GameImage2 { get; set; }
        public string GameImage3 { get; set; }
        public string GameImage4 { get; set; }
        public DateTime GameSubmissionDateUtc { get; set; }
        public DateTime? GameReviewDateUtc { get; set; }
    }
}
