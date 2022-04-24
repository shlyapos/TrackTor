using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrackTor.Adaptor.Models;

namespace TrackTor.Adaptor.Api
{
    public interface ITrackCheckPointRepository
    {
        Task<List<TrackCheckPointModel>> GetPointsByTrackIdAsync(Guid trackId);
    }
}