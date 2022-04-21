using System;

namespace TrackTor.DataBase.Models
{
    public class TrackCheckPoint
    {
        public Guid Id { get; }
        public Guid TrackId { get; set; }

        public double Longitude { get; set; }
        public double Latitude { get; set; }

        public Track? Track { get; set; }
    }
}