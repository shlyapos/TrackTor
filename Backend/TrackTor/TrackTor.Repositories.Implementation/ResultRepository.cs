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
        }
        /*
        public async Task<ScheduleModel> UpdateScheduleAsync(ScheduleModel updateScheduleModel)
        {
            var dbScheduleModel = _converter.Convert(updateScheduleModel);
            
            var schedule = await _context.Schedule!
                .Where(s => s.Id == dbScheduleModel.Id)
                .FirstOrDefaultAsync();
            
            if (schedule == null) 
                throw new NotFoundException($"Schedule with such ID is not found.");

            schedule = dbScheduleModel;
            
            await _context.SaveChangesAsync();
            return _converter.Convert(schedule!);
        }
        
        public async Task<ScheduleModel> DeleteScheduleAsync(Guid id)
        {
            var schedule = await _context.Schedule!
                .Where(s => s.Id == id)
                .FirstOrDefaultAsync();
            var scheduleModel = _converter.Convert(schedule!);
            
            if (schedule != null)
            {
                _context.Schedule!.Remove(schedule);
                await _context.SaveChangesAsync();
            }

            return scheduleModel;
        }
        */
    }
}