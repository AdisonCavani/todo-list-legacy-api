using System.Security.Claims;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Contracts.Requests;
using Server.Database;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Task;

public class Delete : EndpointBaseAsync
    .WithRequest<DeleteTaskReq>
    .WithActionResult
{
    private readonly AppDbContext _context;

    public Delete(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpDelete(ApiRoutes.Task.Delete)]
    [SwaggerOperation(
        Summary = "Remove Task by id",
        Description = "",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult> HandleAsync(
        [FromQuery] DeleteTaskReq req,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        var entity = await _context.Tasks
            .Where(x => x.UserId == userId)
            .FirstOrDefaultAsync(x => x.Id == req.Id, ct);

        if (entity is null)
            return NotFound();

        _context.Tasks.Remove(entity);
        await _context.SaveChangesAsync(ct);

        return NoContent();
    }
}