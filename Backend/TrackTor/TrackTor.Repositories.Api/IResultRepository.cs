using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrackTor.Adaptor.Models;

namespace TrackTor.Repositories.Api
{
    public interface IResultRepository
    {
        /// <summary>
        /// Поиск лучших результатов по id
        /// </summary>
        /// <param name="id">Id трека</param>
        /// <returns>Список лучших результатов</returns>
        Task<List<ResultModel>> FindTopResultAsync(Guid trackId);
        
        /// <summary>
        /// Поиск моих результатов по id
        /// </summary>
        /// <param name="id">Id результата</param>
        /// <returns>Модель результата</returns>
        Task<ResultModel> FindMyResultAsync(Guid trackId, Guid userId);
        
        /// <summary>
        /// Добавление результата
        /// </summary>
        /// <param name="result">модель результата</param>
        /// <returns>Модель результата</returns>
        Task AddResultAsync(ResultModel result);
    }
}