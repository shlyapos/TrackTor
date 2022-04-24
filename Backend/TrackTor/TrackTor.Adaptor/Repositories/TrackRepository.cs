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
        private readonly TrackTorDBContext _context;
        private readonly long EARTH_RADIUS = 6372795;

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
            var trackDB = new Track(
                id: trackModel.Id,
                userId: trackModel.UserId,
                name: trackModel.Name,
                type: (TransportTypeDB)trackModel.Type,
                trackModel.Region!,
                distance: trackModel.Distance,
                new DateTime(0));

            await _context.Track!.AddAsync(trackDB);
            await _context.SaveChangesAsync();
            
            foreach (var point in points)
            {
                await _context.AddAsync(new TrackCheckPoint(point.Id, point.TrackId, point.Longitude, point.Latitude));
            }
            await _context.SaveChangesAsync(); 
        }

        public async Task UpdateTrackAsync(Guid id, TrackModel trackModel)
        {
            var oldTrack = await _context.Track.Where(track => track.Id == id).FirstOrDefaultAsync();
            if (oldTrack == null)
                throw new Exception($"Not found track with such id: {id}");

            oldTrack.Name = trackModel.Name;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTrackAsync(Guid id)
        {
            var track = await _context.Track.Where(track => track.Id == id).FirstOrDefaultAsync();
            if (track == null)
                throw new Exception($"Not found track with such id: {id}");

            _context.Track.Remove(track);
            await _context.SaveChangesAsync();
        }

        private double Distance(List<TrackCheckPointModel> checkPoints)
        {
            var count = checkPoints.Count;
            double res = 0;
            for (int i = 0; i < count - 1; i++)
            {
                var aLatitude = checkPoints[i].Latitude * Math.PI / 180;
                var aLongitude = checkPoints[i].Longitude * Math.PI / 180;
                var bLatitude = checkPoints[i + 1].Latitude * Math.PI / 180;
                var bLongitude = checkPoints[i + 1].Longitude * Math.PI / 180;

                var cl1 = Math.Cos(aLatitude);
                var cl2 = Math.Cos(bLatitude);
                var sl1 = Math.Sin(aLatitude);
                var sl2 = Math.Sin(bLatitude);
                var delta = bLongitude - aLongitude;
                var cdelta = Math.Cos(delta);
                var sdelta = Math.Sin(delta);

                var y = Math.Sqrt(Math.Pow(cl2 * sdelta, 2) + Math.Pow(cl1 * sl2 + sl1 * cl2 * cdelta, 2));
                var x = sl1 * sl2 + cl1 * cl2 * cdelta;

                res += Math.Atan2(y, x) * EARTH_RADIUS; 
            }

            return res;
        }
    }
}