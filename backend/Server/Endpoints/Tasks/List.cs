using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts.Dtos;
using Server.Contracts.Responses;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class List
{
    public static async Task<Results<StatusCodeHttpResult, Ok<PaginatedRes<TaskDto>>>> HandleAsync(
        HttpContext context,
        [FromServices] ITaskRepository repo,
        CancellationToken ct = default)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return TypedResults.StatusCode(StatusCodes.Status500InternalServerError);

        var response = await repo.ListAsync(userId, ct);

        return TypedResults.Ok(response);
    }
}