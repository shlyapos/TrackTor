using System;
using System.Collections.Generic;

namespace TrackTor.Dtos.Track
{
    public class CreateTrackDto
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public int TransportType { get; set; }
        public List<PointDto> Points { get; set; }
        public double Distance { get; set; }
        public string Region { get; set; }

        public CreateTrackDto(
            Guid userId,
            string name,
            int transportType,
            List<PointDto> points,
            double distance,
            string region)
        {
            UserId = userId;
            Name = name;
            TransportType = transportType;
            Points = points;
            Distance = distance;
            Region = region;
        }
    }
}