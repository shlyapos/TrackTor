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
    [Route("tracks")]
    [ApiController]
    public class TrackController: ControllerBase
    {
        private readonly ITrackRepository _trackRepository;
        private readonly ITrackCheckPointRepository _pointRepository;

        public TrackController(ITrackRepository trackRepository,
            ITrackCheckPointRepository pointRepository)
        {
            _trackRepository = trackRepository;
            _pointRepository = pointRepository;
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
                    points.Add(new TrackCheckPointModel(Guid.NewGuid(), point.TrackId, point.Lng, point.Lat));
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
        public async Task<IActionResult> GetAllTracks()
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
        [SwaggerOperation("Получение трека по id")]
        [SwaggerResponse(statusCode: 200, description: "Результаты получены.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> GetTrackAsync(Guid trackId)
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
        /// Получить точки 
        /// </summary>
        /// <response code="200">Результаты получены.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpGet]
        [Route("{trackId:guid}/points")]
        [SwaggerOperation("Получить свои результаты.")]
        [SwaggerResponse(statusCode: 200, description: "Результаты получены.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> GetPointsByTrack(Guid trackId)
        {
            IActionResult response;
            try
            {
                var points = await _pointRepository.GetPointsByTrackIdAsync(trackId);
                response = Ok(points.Select(point => new PointDto(
                    point.Id, point.Latitude, point.Longitude)).ToList());
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
    }
}