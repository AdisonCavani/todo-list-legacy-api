#if DEBUG
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
#endif

namespace Server.Startup;

public static class Swagger
{
    public static void AddSwagger(this IServiceCollection services)
    {
#if DEBUG
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.DescribeAllParametersInCamelCase();

            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new()
            {
                Description = "JWT Authorization header using the bearer scheme",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey
            });
        });
#endif
    }
}