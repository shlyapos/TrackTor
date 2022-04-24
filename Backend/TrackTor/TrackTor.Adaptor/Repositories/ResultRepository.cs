using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TrackTor.Adaptor;
using TrackTor.Adaptor.Models;
using TrackTor.DataBase;
using TrackTor.DataBase.Models;
using TrackTor.Repositories.Api;

namespace TrackTor.Repositories.Implementation
{
    public class ResultRepository: IResultRepository
    {
        readonly private TrackTorDBContext _context;

        public ResultRepository(TrackTorDBContext context)
        {
            _context = context;
        }

        public async Task<List<ResultModel>> FindTopResultAsync(Guid trackId)
        {
            var results =  await _context.Result!
                .Where(r => r.TrackId == trackId)
                .OrderBy(r => r.RecordTime)
                .ToListAsync();
            
            return results.Select(result => new ResultModel(
                id: result.Id,
                trackId: result.TrackId,
                userId: result.UserId,
                recordTime: result.RecordTime)).ToList();
        }
        
        public async Task<ResultModel> FindMyResultAsync(Guid trackId, Guid userId)
        {
            var result = await _context.Result!
                .Where(r => r.TrackId == trackId)
                .Where(r => r.UserId == userId)
                .FirstOrDefaultAsync();
            
            return new ResultModel(
                id: result.Id,
                trackId: result.TrackId,
                userId: result.UserId,
                recordTime: result.RecordTime);
        }

        public async Task AddResultAsync(ResultModel result)
        {
            var resultDb = new Result(
                id: result.Id,
                trackId: result.TrackId,
                userId: result.UserId,
                recordTime: result.RecordTime
            );
            await _context.Result!.AddAsync(resultDb);
            await _context.SaveChangesAsync();
            var track = await _context.Track
                .Where(track => track.Id == result.TrackId)
                .Include(track => track.Results)
                .FirstOrDefaultAsync();
            var sum = 0;
            foreach (var res in track.Results)
            {
                sum += res.RecordTime.Second;
            }

            track.AverageTime = new DateTime(sum / track.Results.Count());
        }
    }
}