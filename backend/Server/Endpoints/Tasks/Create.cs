using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class Create
{
    internal static async Task<Results<StatusCodeHttpResult, Created<TaskDto>>> HandleAsync(
        [FromBody] CreateTaskReq req,
        HttpContext context,
        ITaskRepository repo,
        CancellationToken ct = default)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return TypedResults.StatusCode(StatusCodes.Status500InternalServerError);

        var response = await repo.CreateAsync(req, userId, ct);

        if (response is null)
            return TypedResults.StatusCode(StatusCodes.Status500InternalServerError);

        return TypedResults.Created($"{ApiRoutes.Tasks}/{response.Id}", response);
    }

    internal static OpenApiOperation OpenApi(OpenApiOperation operation)
    {
        operation.Summary = "Create new Task";

        return operation;
    }
}