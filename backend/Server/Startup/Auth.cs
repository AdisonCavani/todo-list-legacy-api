using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Server.Startup;

public static class Auth
{
    public static void AddAuth(this IServiceCollection services)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
            x.UseGoogle(Environment.GetEnvironmentVariable(EnvVariables.GoogleClientId) ??
                        throw new Exception($"${nameof(EnvVariables.GoogleClientId)} env variable cannot be null")));
    }
}