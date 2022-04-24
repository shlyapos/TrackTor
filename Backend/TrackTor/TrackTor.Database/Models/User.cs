using System;
using System.Collections.Generic;

namespace TrackTor.DataBase.Models
{
    public class User
    {
        public Guid Id { get; }
        public string Login { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }

        public List<Result>? Results { get; set; }
        public List<Track>? Tracks { get; set; }
    }
}