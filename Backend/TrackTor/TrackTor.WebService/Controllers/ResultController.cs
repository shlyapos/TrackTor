using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TrackTor.Adaptor.Models;
using TrackTor.Dtos;
using TrackTor.Dtos.Result;
using TrackTor.Repositories.Api;


namespace TrackTor.Controllers
{
    [Route("result")]
    [ApiController]
    public class ResultController: ControllerBase
    {
        private readonly IResultRepository _resultRepository;
        private readonly IDtoConverter<ResultModel, ResultDto> _resultConverter;

        public ResultController(IResultRepository resultRepository,
            IDtoConverter<ResultModel, ResultDto> resultConverter)
        {
            _resultRepository = resultRepository;
            _resultConverter = resultConverter;
        }

        /// <summary>
        /// Добавить результат.
        /// </summary>
        /// <response code="200">Результат добавлен.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpPost]
        [Route("")]
        [SwaggerOperation("Добавить результат пользователя.")]
        [SwaggerResponse(statusCode: 200, type: typeof(ResultDto), description: "результат добавлен.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> AddUser([FromBody] ResultDto resultDto)
        {
            IActionResult response;
            try
            {
                await _resultRepository.AddResultAsync(_resultConverter.Convert(resultDto));
                response = Ok();
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
        
        /// <summary>
        /// Получить топ результатов по треку.
        /// </summary>
        /// <response code="200">Результаты получены.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpGet]
        [Route("{trackId:guid}")]
        [SwaggerOperation("Получить топ результатов.")]
        [SwaggerResponse(statusCode: 200, description: "Результаты получены.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> GetTopResults(Guid trackId)
        {
            IActionResult response;
            try
            {
                var results = await _resultRepository.FindTopResultAsync(trackId);
                response = Ok(results.Select(result => _resultConverter.Convert(result)).ToList());
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
        
        /// <summary>
        /// Получение результата пользователя по треку
        /// </summary>
        /// <response code="200">Результаты получены.</response>
        /// <response code="401">Отказ в доступе: пользователь не авторизован.</response>
        /// <response code="500">Ошибка на стороне сервера.</response>
        [HttpGet]
        [Route("{trackId:guid}/{userId:guid}")]
        [SwaggerOperation("Получить свои результаты.")]
        [SwaggerResponse(statusCode: 200, description: "Результаты получены.")]
        [SwaggerResponse(statusCode: 500, type: typeof(EmptyResult), description: "Ошибка на стороне сервера.")]
        public async Task<IActionResult> GetMyResults(Guid trackId, Guid userId)
        {
            IActionResult response;
            try
            {
                var result = await _resultRepository.FindMyResultAsync(trackId, userId);
                response = Ok(result);
            }
            catch(Exception ex)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, ex.Message); 
            }
            return response;
        }
        
    }
}