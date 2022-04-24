using System;

namespace TrackTor.Dtos.Track
{
    public class PointDto
    { 
        public Guid TrackId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public PointDto(
            Guid trackId,
            double latitude,
            double longitude)
        {
            TrackId = trackId;
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}