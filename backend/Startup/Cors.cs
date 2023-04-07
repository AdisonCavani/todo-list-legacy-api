namespace Server.Startup;

public static class Cors
{
    public static void AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(opt =>
        {
            opt.AddDefaultPolicy(policy =>
            {
                policy
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithOrigins(Environment.GetEnvironmentVariable(EnvVariables.CorsOrigin) ??
                                 throw new Exception(
                                     $"${nameof(EnvVariables.CognitoAuthority)} env variable cannot be null"));
            });
        });
    }
}