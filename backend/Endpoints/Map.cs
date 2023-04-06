using Server.Contracts.Requests;
using Server.Filters;

namespace Server.Endpoints;

public static class Map
{
    public static void MapTasksApi(this RouteGroupBuilder group)
    {
        group.MapPost("/", Tasks.Create.HandleAsync)
            .RequireAuthorization()
            .AddEndpointFilter<ValidationFilter<CreateTaskReq>>()
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Create new Task"
            });

        group.MapDelete("/{id}", Tasks.Delete.HandleAsync)
            .RequireAuthorization()
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Remove Task by id"
            });

        group.MapGet("/", Tasks.List.HandleAsync)
            .RequireAuthorization()
            .AddEndpointFilter<ValidationFilter<PaginatedReq>>()
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Get a list of Tasks"
            });

        group.MapPatch("/", Tasks.Update.HandleAsync)
            .RequireAuthorization()
            .AddEndpointFilter<ValidationFilter<UpdateTaskReq>>()
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Update a Task"
            });

        group.WithTags("Task Endpoint");
    }
}