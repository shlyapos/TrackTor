using System;
using System.Collections.Generic;

namespace TrackTor.Dtos.Track
{
    public class TrackDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public int TransportType { get; set; }
        public double Distance { get; set; }
        public string Region { get; set; }
        public int Time { get; set; }

        public TrackDto(
            Guid id,
            Guid userId,
            string name,
            int transportType,
            double distance,
            string region,
            int time)
        {
            Id = id;
            UserId = userId;
            Name = name;
            TransportType = transportType;
            Distance = distance;
            Region = region;
            Time = time;
        }
    }
}