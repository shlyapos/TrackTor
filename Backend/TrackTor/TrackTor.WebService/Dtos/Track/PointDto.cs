using System;

namespace TrackTor.Dtos.Track
{
    public class PointDto
    { 
        public Guid TrackId { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

        public PointDto(
            Guid trackId,
            double lat,
            double lng)
        {
            TrackId = trackId;
            Lng = lng;
            Lat = lat;
        }
    }
}