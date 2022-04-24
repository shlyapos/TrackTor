using System;
using TrackTor.Adaptor.Models;

namespace TrackTor.Dtos.Result
{
    public class ResultConverter : IDtoConverter<ResultModel, CreateResultDto, ResultDto>
    {
    public ResultModel Convert(CreateResultDto dto) => new(
        id: Guid.NewGuid(),
        userId: dto.UserId,
        trackId: dto.TrackId,
        recordTime: dto.RecordTime);

    public ResultDto Convert(ResultModel model) => new(
        id: model.Id,
        userId: model.UserId,
        trackId: model.TrackId,
        recordTime: model.RecordTime);
    }
}