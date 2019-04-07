using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Models.Database
{
    public class ArcadeMachine
    {
        public int? ArcadeMachineId { get; set; }
        public string ArcadeMachineAddress { get; set; }
        public string ArcadeMachineRoom { get; set; }
        public string ArcadeMachineCoords { get; set; }
        public string ArcadeMachineDescription { get; set; }
    }
}
