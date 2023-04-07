using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class List
{
    public static async Task<IResult> HandleAsync(
        HttpContext context,
        [FromServices] ITaskRepository repo,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return Results.StatusCode(StatusCodes.Status500InternalServerError);

        var response = await repo.ListAsync(new()
        {
            Page = 1,
            PageSize = 100
        }, userId, ct);
        return Results.Ok(response);
    }
}