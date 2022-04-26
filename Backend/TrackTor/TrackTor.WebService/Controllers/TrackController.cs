using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TrackTor.Adaptor.Api;
using TrackTor.Adaptor.Models;
using TrackTor.DataBase.Models.Enums;
using TrackTor.Dtos;
using TrackTor.Dtos.Result;
using TrackTor.Dtos.Track;
using TrackTor.Repositories.Api;


namespace TrackTor.Controllers
{
    [Route("track")]
    [ApiController]
    public class TrackController: ControllerBase
    {
        private readonly ITrackRepository _trackRepository;

        public TrackController(ITrackRepository trackRepository)
        {
            _trackRepository = trackRepository;
        }

        /// <summary>
        /// Создать трек.
        /// </summary>
        /// <response code="200">Трек создан.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpPost]
        [Authorize]
        [Route("")]
        [SwaggerOperation("Создать трек.")]
        [SwaggerResponse(statusCode: 200, type: typeof(ResultDto), description: "Трек создан.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> CreateTrack([FromBody] CreateTrackDto trackDto)
        {
            IActionResult response;
            try
            {
                var points = new List<TrackCheckPointModel>();
                foreach (var point in trackDto.Points)
                {
                    points.Add(new TrackCheckPointModel(Guid.NewGuid(), point.TrackId, point.Longitude, point.Latitude));
                }
                await _trackRepository.CreateTrackAsync(new TrackModel(
                    Guid.NewGuid(),
                    trackDto.UserId, 
                    trackDto.Name, 
                    (TransportType)trackDto.TransportType, 
                    trackDto.Region, 
                    trackDto.Distance, 
                    new DateTime(0)),
                    points);
                response = Ok();
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
        
        /// <summary>
        /// Получить все треки.
        /// </summary>
        /// <response code="200">Треки получены.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpGet]
        [Route("")]
        [SwaggerOperation("Получить все треки.")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<TrackDto>), description: "Треки получены.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> GetTopResults(Guid trackId)
        {
            IActionResult response;
            try
            {
                var results = await _trackRepository.GetAllTrackAsync();
                response = Ok(results.Select(track => new TrackDto(
                    track.Id, 
                    track.UserId, 
                    track.Name, 
                    (int)track.Type,
                    track.Distance,
                    track.Region,
                    track.AverageTime.Second)).ToList());
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
        
        /// <summary>
        /// Получение трека по id
        /// </summary>
        /// <response code="200">Результаты получены.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpGet]
        [Route("{trackId:guid}")]
        [SwaggerOperation("Получить свои результаты.")]
        [SwaggerResponse(statusCode: 200, description: "Результаты получены.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> GetMyResults(Guid trackId)
        {
            IActionResult response;
            try
            {
                var track = await _trackRepository.GetTrackAsync(trackId);
                response = Ok(new TrackDto(
                    track.Id, 
                    track.UserId, 
                    track.Name, 
                    (int)track.Type,
                    track.Distance,
                    track.Region,
                    track.AverageTime.Second));
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
        /// <summary>
        /// Удалить трек
        /// </summary>
        /// <response code="200">Трек удален.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpDelete]
        [Authorize]
        [Route("{trackId:guid}")]
        [SwaggerOperation("Удалить трек")]
        [SwaggerResponse(statusCode: 200, description: "Трек удален")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> DeleteTrack(Guid trackId)
        {
            throw new NotImplementedException();
        }
        
        /// <summary>
        /// Обновить трек
        /// </summary>
        /// <response code="200">Трек обновлен.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpPut]
        [Authorize]
        [Route("{trackId:guid}")]
        [SwaggerOperation("Удалить трек")]
        [SwaggerResponse(statusCode: 200, description: "Трек обновлен")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> UpdateTrack(Guid trackId)
        {
            throw new NotImplementedException();
        }
    }
}