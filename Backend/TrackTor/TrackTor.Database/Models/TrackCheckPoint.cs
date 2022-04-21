using System;

namespace TrackTor.DataBase.Models
{
    public class TrackCheckPoint
    {
        public Guid Id { get; }
        public Guid TrackId { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }

        public Track? Track { get; set; }
    }
}