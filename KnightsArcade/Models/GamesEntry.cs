using System;
using System.ComponentModel.DataAnnotations;

namespace KnightsArcade.Models
{
    public class GamesEntry
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
        public string[] GameImg { get; set; }
        public DateTime GameSubmissionDateUtc { get; set; }
        public DateTime? GameReviewDateUtc { get; set; }
    }
}
