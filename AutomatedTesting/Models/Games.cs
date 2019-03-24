using System;
using System.ComponentModel.DataAnnotations;

namespace AutomatedTesting.Models
{
    public partial class Games
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
        public bool? GameGenreShooter { get; set; }
        public bool? GameGenreStrategy { get; set; }
        public bool? GameGenreSports { get; set; }
        public bool? GameGenreRpg { get; set; }
        public bool? GameGenreRacing { get; set; }
        public bool? GameGenreAdventure { get; set; }
        public bool? GameGenreAction { get; set; }
        public bool? GameGenreRhythm { get; set; }
        public bool? GameGenrePlatformer { get; set; }
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
