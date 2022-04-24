using System;

namespace TrackTor.DataBase.Models
{
    public class Result
    {
        public Guid Id { get; }
        public Guid UserId { get; set; }
        public Guid TrackId { get; set; }
        public DateTime RecordTime { get; set; }

        public Track? Track { get; set; }
        public User? User { get; set; }
        
        public Result(Guid id,
            Guid userId,
            Guid trackId,
            DateTime recordTime)
        {
            Id = id;
            UserId = userId;
            TrackId = trackId;
            RecordTime = recordTime;
        }
    }
}