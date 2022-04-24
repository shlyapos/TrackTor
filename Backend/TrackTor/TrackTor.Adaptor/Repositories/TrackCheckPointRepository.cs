using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TrackTor.Adaptor.Api;
using TrackTor.Adaptor.Models;
using TrackTor.DataBase;
using TrackTor.DataBase.Models;

namespace TrackTor.Adaptor.Repositories
{
    public class TrackCheckPointRepository: ITrackCheckPointRepository
    {
        private readonly TrackTorDBContext _context;

        public TrackCheckPointRepository(TrackTorDBContext context)
        {
            _context = context;
        }

        public async Task<List<TrackCheckPointModel>> GetPointsByTrackIdAsync(Guid trackId)
        {
            var points = await _context.TrackCheckPoint!
                .Where(point => point.TrackId == trackId)
                .ToListAsync();

            var res = new List<TrackCheckPointModel>();

            foreach (var point in points)
            {
                res.Add(new TrackCheckPointModel(point.Id, point.TrackId, point.Longitude, point.Latitude));
            }

            return res;
        }
    }
}