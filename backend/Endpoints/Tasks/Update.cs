using System.Security.Claims;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database;
using Server.Mappers;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Tasks;

public class Update : EndpointBaseAsync
    .WithRequest<UpdateTaskReq>
    .WithActionResult<TaskDto>
{
    private readonly AppDbContext _context;

    public Update(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpPatch(ApiRoutes.Tasks)]
    [SwaggerOperation(
        Summary = "Update a Task",
        Description = "",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult<TaskDto>> HandleAsync(
        [FromBody] UpdateTaskReq req,
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

        req.ToTaskEntity();
        await _context.SaveChangesAsync(ct);
        return Ok(entity.ToTaskDto());
    }
}