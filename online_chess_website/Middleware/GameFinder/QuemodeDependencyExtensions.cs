using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace online_chess_website.Middleware.GameFinder;

public static class QuemodeDependencyExtensions
{
    public static IServiceCollection AddQuemodeManager(this IServiceCollection services)
    {
        services.AddSingleton<QuemodeManager>();
        return services;
    }
}
