using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts.Requests;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class Update
{
    public static async Task<IResult> HandleAsync(
        [FromBody] UpdateTaskReq req,
        HttpContext context,
        [FromServices] ITaskRepository repo,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return Results.StatusCode(StatusCodes.Status500InternalServerError);

        var response = await repo.UpdateAsync(req, userId, ct);

        if (response is null)
            return TypedResults.NotFound();

        return TypedResults.Ok(response);
    }
}