using System;

namespace TrackTor.Adaptor.Models
{
    public class TrackCheckPointModel
    {
        public Guid Id { get; }
        public Guid TrackId { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }

        public TrackCheckPointModel(
            Guid id,
            Guid trackId,
            double longitude,
            double latitude)
        {
            Id = id;
            TrackId = trackId;
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}