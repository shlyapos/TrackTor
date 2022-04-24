using System;

namespace TrackTor.Dtos.Result
{
    public class CreateResultDto
    {
        public Guid UserId { get; set; }
        public Guid TrackId { get; set; }
        public int RecordTime { get; set; }

        public CreateResultDto(
            Guid userId,
            Guid trackId,
            int recordTime)
        {
            UserId = userId;
            TrackId = trackId;
            RecordTime = recordTime;
        }
    }
}