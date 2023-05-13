using Server.Contracts;
using Server.Contracts.Requests;
using Server.Filters;

namespace Server.Endpoints;

public static class Map
{
    private static void MapTasksApi(this RouteGroupBuilder group)
    {
        group.MapPost("/", Tasks.Create.HandleAsync)
            .RequireAuthorization()
            .AddEndpointFilter<ValidationFilter<CreateTaskReq>>()
            .WithOpenApi(Tasks.Create.OpenApi);

        group.MapGet("/{id}", Tasks.Get.HandleAsync)
            .RequireAuthorization()
            .WithOpenApi(Tasks.Get.OpenApi);

        group.MapDelete("/{id}", Tasks.Delete.HandleAsync)
            .RequireAuthorization()
            .WithOpenApi(Tasks.Delete.OpenApi);

        group.MapGet("/", Tasks.List.HandleAsync)
            .RequireAuthorization()
            .AddEndpointFilter<ValidationFilter<PaginatedReq>>()
            .WithOpenApi(Tasks.List.OpenApi);

        group.MapPatch("/", Tasks.Update.HandleAsync)
            .RequireAuthorization()
            .AddEndpointFilter<ValidationFilter<UpdateTaskReq>>()
            .WithOpenApi(Tasks.Update.OpenApi);

        group.WithTags("Task Endpoint");
    }
    
    public static void MapEndpoints(this WebApplication app)
    {
        app.MapGet(ApiRoutes.Health, Health.HandleAsync)
            .WithTags("Health Endpoint")
            .WithOpenApi(Health.OpenApi);
        
        app.MapGroup(ApiRoutes.Tasks).MapTasksApi();
    }
}