using Microsoft.Extensions.DependencyInjection;
using TrackTor.Adaptor.Models;
using TrackTor.Dtos.Result;
using TrackTor.Dtos.User;

namespace TrackTor.Dtos
{
    public static class ProviderExtension
    {
        public static IServiceCollection AddDtoConverters(this IServiceCollection services)
        {
            services.AddTransient<IDtoConverter<UserModel, UserDto>, UserConverter>();
            services.AddTransient<IDtoConverter<ResultModel, ResultDto>, ResultConverter>();
            return services;
        }
    }
}