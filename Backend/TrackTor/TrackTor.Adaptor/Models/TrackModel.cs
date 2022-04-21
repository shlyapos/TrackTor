using System;
using TrackTor.DataBase.Models.Enums;

namespace TrackTor.Adaptor.Models
{
    public class TrackModel
    {
        public Guid Id { get; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public TransportType Type { get; set; }
        public string? Region { get; set; }
        public double? Distance { get; set; }
        public DateTime? AverageTime { get; set; }

        public TrackModel(Guid id, 
            Guid userId,
            string name,
            TransportType type,
            string? region,
            double? distance,
            DateTime? averageTime)
        {
            
        }
    }
}