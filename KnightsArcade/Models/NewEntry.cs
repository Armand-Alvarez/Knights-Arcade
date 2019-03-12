namespace KnightsArcade.Models
{
    public class NewEntry
    {
        public string GameName { get; set; }
        public string GameCreatorName { get; set; }
        public string GameCreatorId { get; set; }
        public string GameDescription { get; set; }
        public string GameControls { get; set; }
        public string GameVideoLink { get; set; }
        public bool GameGenreSurvival { get; set; }
        public bool GameGenreFighting { get; set; }
        public bool GameGenrePuzzle { get; set; }
        public bool GameGenreShooter { get; set; }
        public bool GameGenreStrategy { get; set; }
        public bool GameGenreSports { get; set; }
        public bool GameGenreRpg { get; set; }
        public bool GameGenreRacing { get; set; }
        public bool GameGenreAdventure { get; set; }
        public bool GameGenreAction { get; set; }
        public bool GameGenreRhythm { get; set; }
        public bool GameGenrePlatformer { get; set; }
        public string GamePath { get; set; }
        public string[] GameImg { get; set; }
    }
}
