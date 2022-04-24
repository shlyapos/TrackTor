using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrackTor.Adaptor.Models;

namespace TrackTor.Repositories.Api
{
    public interface IResultRepository
    {
        /// <summary>
        /// Получение отсортированных по рекордному времени результатов по id трека
        /// </summary>
        /// <param name="trackId">Id трека</param>
        /// <returns>Список отсортированных по рекордному времени результатов</returns>
        Task<List<ResultModel>> FindTopResultAsync(Guid trackId);
        
        /// <summary>
        /// Получение результата пользователя по треку
        /// </summary>
        /// <param name="trackId">Id трека</param>
        /// <param name="userId">Id пользователя</param>
        /// <returns>Модель результата</returns>
        Task<ResultModel> FindMyResultAsync(Guid trackId, Guid userId);
        
        /// <summary>
        /// Добавление результата
        /// </summary>
        /// <param name="result">модель результата</param>
        Task AddResultAsync(ResultModel result);
    }
}