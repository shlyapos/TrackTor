using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrackTor.Adaptor.Models;

namespace TrackTor.Adaptor.Api
{
    public interface ITrackRepository
    {
        Task<List<TrackModel>> GetAllTrackAsync();
        Task<TrackModel> GetTrackAsync(Guid id);
        Task CreateTrackAsync(TrackModel trackModel, List<TrackCheckPointModel> points);
        Task UpdateTrackAsync(Guid id, TrackModel trackModel);
        Task DeleteTrackAsync(Guid id);
    }
}