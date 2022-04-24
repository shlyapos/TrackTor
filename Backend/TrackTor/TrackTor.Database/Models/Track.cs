using System;
using System.Collections.Generic;
using TrackTor.DataBase.Models.Enums;

namespace TrackTor.DataBase.Models
{
    public class Track
    {
        public Guid Id { get; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public TransportTypeDB Type { get; set; }
        public string? Region { get; set; }
        public double Distance { get; set; }
        public DateTime AverageTime { get; set; }

        public List<TrackCheckPoint>? Points { get; set; }
        public User? User { get; set; }
        public List<Result>? Results { get; set; }
        
        public Track(Guid id, 
            Guid userId,
            string name,
            TransportTypeDB type,
            string region,
            double distance,
            DateTime averageTime)
        {
            Id = id;
            UserId = userId;
            Name = name;
            Type = type;
            Region = region;
            Distance = distance;
            AverageTime = averageTime;
        }
    }
}