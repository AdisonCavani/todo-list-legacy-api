using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class Delete
{
    public static async Task<IResult> HandleAsync(
        [FromRoute] Guid id,
        HttpContext context,
        [FromServices] ITaskRepository repo,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return Results.StatusCode(StatusCodes.Status500InternalServerError);

        var deleted = await repo.DeleteAsync(id, userId, ct);

        return deleted ? Results.NoContent() : Results.NotFound();
    }
}