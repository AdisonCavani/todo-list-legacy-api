using System.Diagnostics.CodeAnalysis;
using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.OpenApi.Models;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class List
{
    internal static async Task<Results<StatusCodeHttpResult, Ok<PaginatedRes<TaskDto>>>> HandleAsync(
        [AsParameters] PaginatedReq req,
        HttpContext context,
        ITaskRepository repo,
        CancellationToken ct = default)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return TypedResults.StatusCode(StatusCodes.Status500InternalServerError);

        var response = await repo.ListAsync(req, userId, ct);

        return TypedResults.Ok(response);
    }

    [ExcludeFromCodeCoverage]
    internal static OpenApiOperation OpenApi(OpenApiOperation operation)
    {
        operation.Summary = "Get a paginated list of Tasks";

        return operation;
    }
}