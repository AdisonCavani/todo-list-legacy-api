using System.Security.Claims;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Repositories;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Tasks;

public class Delete : EndpointBaseAsync
    .WithRequest<Guid>
    .WithActionResult
{
    private readonly ITaskRepository _repo;

    public Delete(ITaskRepository repo)
    {
        _repo = repo;
    }

    [Authorize]
    [HttpDelete(ApiRoutes.Tasks + "/{id}")]
    [SwaggerOperation(
        Summary = "Remove Task by id",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult> HandleAsync(
        Guid id,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        var deleted = await _repo.DeleteAsync(id, userId, ct);

        return deleted ? NoContent() : NotFound();
    }
}