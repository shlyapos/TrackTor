using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TrackTor.Adaptor.Api;
using TrackTor.Adaptor.Models;
using TrackTor.DataBase;
using TrackTor.DataBase.Models;
using TrackTor.DataBase.Models.Enums;

namespace TrackTor.Adaptor.Repositories
{
    public class TrackRepository: ITrackRepository
    {
        readonly private TrackTorDBContext _context;

        public TrackRepository(TrackTorDBContext context)
        {
            _context = context;
        }

        public async Task<List<TrackModel>> GetAllTrackAsync()
        {
            var tracks = await _context.Track!
                .Include(track => track.Points)
                .Include(track => track.Results)
                .ToListAsync();
            var res = new List<TrackModel>();
            foreach (var track in tracks)
            {
                // DateTime? avgTime;
                // var first = track.Results!.First().RecordTime.Ticks;
                // if (first != null)
                // {
                //     
                //     avgTime = new DateTime(first + (long) track.Results!.Average(d => d.RecordTime.Ticks - first));
                // }
                // else
                // {
                //     avgTime = null;
                // }

                res.Add(new TrackModel(
                    id: track.Id,
                    userId: track.UserId,
                    name: track.Name,
                    type: (TransportType)track.Type,
                    track.Region,
                    distance: track.Distance,
                    averageTime: track.AverageTime
                    ));
            }

            return res;
        }

        public async Task<TrackModel> GetTrackAsync(Guid id)
        {
            var track = await _context.Track!
                .Where(track => track.Id == id)
                .Include(track => track.Points)
                .Include(track => track.Results)
                .FirstOrDefaultAsync();

            return new TrackModel(
                id: track.Id,
                userId: track.UserId,
                name: track.Name,
                type: (TransportType) track.Type,
                track.Region,
                distance: track.Distance,
                averageTime: track.AverageTime
            );
        }

        public async Task CreateTrackAsync(TrackModel trackModel, List<TrackCheckPointModel> points)
        {
            var pointRes = new List<TrackCheckPointModel>();
            foreach (var point in points)
            {
                pointRes.Add(new TrackCheckPointModel(point.Id, point.TrackId, point.Longitude, point.Latitude));
            }
            var distance = Distance(pointRes);
            
            var trackDB = new Track(
                id: trackModel.Id,
                userId: trackModel.UserId,
                name: trackModel.Name,
                type: (TransportTypeDB)trackModel.Type,
                trackModel.Region!,
                distance,
                new DateTime(0));

            await _context.Track!.AddAsync(trackDB);
        }

        public Task UpdateTrackAsync(Guid id, TrackModel trackModel)
        {
            throw new NotImplementedException();
        }

        public Task DeleteTrackAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        private double Distance(List<TrackCheckPointModel> checkPoints)
        {
            var count = checkPoints.Count;
            double res = 0;
            for (int i = 0; i < count - 1; i++)
            {
                var aLatitude = checkPoints[i].Latitude;
                var aLongitude = checkPoints[i].Longitude;
                var bLatitude = checkPoints[i + 1].Latitude;
                var bLongitude = checkPoints[i + 1].Longitude;
                res += Math.Sin(aLatitude) + Math.Sin(bLatitude) + Math.Cos(aLatitude) -
                       Math.Cos(bLatitude) * Math.Cos(bLongitude - aLongitude);
            }

            return res;
        }
    }
}