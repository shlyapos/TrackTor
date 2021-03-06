using System;

namespace TrackTor.Dtos.Result
{
    public class ResultDto
    {
        public Guid Id { get; }
        public Guid UserId { get; set; }
        public Guid TrackId { get; set; }
        public int RecordTime { get; set; }

        public ResultDto(
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