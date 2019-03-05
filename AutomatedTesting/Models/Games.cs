using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatedTesting.Models
{
    public class Games
    {
        public int GameId { get; set; }
        public string GameName { get; set; }
        public int GameCreatorId { get; set; }
        public string GameCreatorname { get; set; }
        public string GameDescription { get; set; }
        public string GameControls { get; set; }
        public string GameVideolink { get; set; }
        public string GameGenres { get; set; }
        public string GameStatus { get; set; }
        public bool GameOnarcade { get; set; }
        public string GamePath { get; set; }
        public string GameImage0 { get; set; }
        public string GameImage1 { get; set; }
        public string GameImage2 { get; set; }
        public string GameImage3 { get; set; }
        public string GameImage4 { get; set; }
        public DateTime GameSubmissiondate { get; set; }
        public DateTime? GameReviewdate { get; set; }
    }

}
