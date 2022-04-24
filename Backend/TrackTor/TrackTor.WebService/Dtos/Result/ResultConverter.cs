using TrackTor.Adaptor.Models;

namespace TrackTor.Dtos.Result
{
    public class ResultConverter: IDtoConverter<ResultModel, ResultDto>
    {
        public ResultModel Convert(ResultDto dto) => new (
            id: dto.Id,
            userId: dto.UserId,
            trackId: dto.TrackId,
            recordTime: dto.RecordTime);

        public ResultDto Convert(ResultModel model) => new (
            id: model.Id,
            userId: model.UserId,
            trackId: model.TrackId,
            recordTime: model.RecordTime);
    }
}