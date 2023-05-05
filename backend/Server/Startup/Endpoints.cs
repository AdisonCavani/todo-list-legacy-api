using Server.Contracts;
using Server.Endpoints;

namespace Server.Startup;

public static class Endpoints
{
    public static void MapEndpoints(this WebApplication app)
    {
        app.MapGroup(ApiRoutes.Tasks).MapTasksApi();
        app.MapGet(ApiRoutes.Health, Health.HandleAsync).WithTags("Health Endpoint").WithOpenApi(operation => new(operation)
        {
            Summary = "Get health check report"
        });
    }
}