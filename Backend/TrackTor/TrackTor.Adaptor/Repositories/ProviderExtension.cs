using Microsoft.Extensions.DependencyInjection;
using TrackTor.Adaptor.Api;
using TrackTor.Adaptor.Repositories;
using TrackTor.Repositories.Api;

namespace TrackTor.Repositories.Implementation
{
    public static class ProviderExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IResultRepository, ResultRepository>();
            services.AddTransient<ITrackCheckPointRepository, TrackCheckPointRepository>();
            services.AddTransient<ITrackRepository, TrackRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            return services;
        }
    }
}