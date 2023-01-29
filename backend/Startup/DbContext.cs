using Microsoft.EntityFrameworkCore;
using Server.Database;

namespace Server.Startup;

public static class DbContext
{
    public static void ConfigureDbContext(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddDbContextPool<AppDbContext>(options =>
        {
            // TODO: add connection string settings
            options.UseNpgsql(
                configuration["SqlConnectionString"],
                npgSettings => { npgSettings.EnableRetryOnFailure(); });
        });
    }
}