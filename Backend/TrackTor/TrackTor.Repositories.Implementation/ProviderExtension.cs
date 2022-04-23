using Microsoft.Extensions.DependencyInjection;
using TrackTor.Repositories.Api;

namespace TrackTor.Repositories.Implementation
{
    public static class ProviderExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            return services;
        }
    }
}