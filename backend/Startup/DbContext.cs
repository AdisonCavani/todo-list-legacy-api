using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Options;

namespace Server.Startup;

public static class DbContext
{
    public static void ConfigureDbContext(this IServiceCollection services, AppOptions appOptions)
    {
        services.AddDbContextPool<AppDbContext>(options =>
        {
            // TODO: add connection string settings
            options.UseNpgsql(
                appOptions.SqlConnectionString,
                npgSettings => { npgSettings.EnableRetryOnFailure(); });
        });
    }
}