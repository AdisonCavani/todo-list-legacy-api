namespace Server.Startup;

public static class Logger
{
    // TODO: remove this when .NET 8 preview 4 is released!
    // See: related issue https://github.com/dotnet/aspnetcore/issues/47598
    public static void AddLogger(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddLogging(logging =>
        {
            logging.AddConfiguration(configuration.GetSection("Logging"));
            logging.AddSimpleConsole();
            logging.Configure(options =>
            {
                options.ActivityTrackingOptions =
                    ActivityTrackingOptions.SpanId |
                    ActivityTrackingOptions.TraceId |
                    ActivityTrackingOptions.ParentId;
            });
        });
    }
}