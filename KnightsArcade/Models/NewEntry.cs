namespace KnightsArcade.Models
{
    public class NewEntry
    {
        public string GameName { get; set; }
        public string GameCreatorName { get; set; }
        public int GameCreatorId { get; set; }
        public string GameDescription { get; set; }
        public string GameControls { get; set; }
        public string GameVideoLink { get; set; }
        public string GameGenres { get; set; }
        public string GamePath { get; set; }
        public string[] GameImg { get; set; }
    }
}
