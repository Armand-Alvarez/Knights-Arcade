using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatedTesting.Models
{
    public class Games
    {
        [Required]
        public int? GameId { get; set; }
        public string GameName { get; set; }
        public string GameCreatorId { get; set; }
        public string GameCreatorName { get; set; }
        public string GameDescription { get; set; }
        public string GameControls { get; set; }
        public string GameVideolink { get; set; }
        public bool? GameGenreSurvival { get; set; }
        public bool? GameGenreFighting { get; set; }
        public bool? GameGenrePuzzle { get; set; }
        public bool? GameGenrePlatformer { get; set; }
        public bool? GameGenreShooter { get; set; }
        public bool? GameGenreStrategy { get; set; }
        public bool? GameGenreSports { get; set; }
        public bool? GameGenreRpg { get; set; }
        public bool? GameGenreRacing { get; set; }
        public bool? GameGenreAdventure { get; set; }
        public bool? GameGenreAction { get; set; }
        public bool? GameGenreRhythm { get; set; }
        public string GameStatus { get; set; }
        public bool GameOnArcade { get; set; }
        public string GamePath { get; set; }
        public string[] GameImg { get; set; }
        public DateTime GameSubmissionDateUtc { get; set; }
        public DateTime? GameReviewDateUtc { get; set; }
    }

}
