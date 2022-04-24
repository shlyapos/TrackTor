using System;

namespace TrackTor.Adaptor.Models
{
    public class ResultModel
    {
        public Guid Id { get; }
        public Guid UserId { get; set; }
        public Guid TrackId { get; set; }
        public int RecordTime { get; set; }

        public ResultModel(
            Guid id,
            Guid userId,
            Guid trackId,
            int recordTime)
        {
            Id = id;
            UserId = userId;
            TrackId = trackId;
            RecordTime = recordTime;
        }
    }
}