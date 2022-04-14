using System;

namespace TrackTor.DataBase.Models
{
    public class User
    {
        public Guid Id { get; }
        public string Login { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }
    }
}