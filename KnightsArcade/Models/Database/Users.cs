using System;
using System.Collections.Generic;

namespace KnightsArcade.Models.Database
{
    public partial class Users
    {
        public string Username { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserImagePath { get; set; }
        public string UserMajor { get; set; }
        public string UserEmail { get; set; }
    }
}
