using System;

namespace TrackTor.DataBase.Models
{
    public class Result
    {
        public Guid Id { get; }
        public Guid UserId { get; set; }
        public Guid TrackId { get; set; }
        public DateTime RecordTime { get; set; }
    }
}