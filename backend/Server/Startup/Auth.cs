using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Server.Startup;

public static class Auth
{
    public static void AddAuth(this IServiceCollection services)
    {
        services.AddCognitoIdentity();
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer("Cognito", options =>
        {
            options.Authority = Environment.GetEnvironmentVariable(EnvVariables.CognitoAuthority) ??
                                throw new Exception(
                                    $"${nameof(EnvVariables.CognitoAuthority)} env variable cannot be null");
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateAudience = false
            };
        }).AddJwtBearer("Google",
            x => x.UseGoogle(Environment.GetEnvironmentVariable(EnvVariables.GoogleClientId) ??
                             throw new Exception(
                                 $"${nameof(EnvVariables.GoogleClientId)} env variable cannot be null")));
    }
}