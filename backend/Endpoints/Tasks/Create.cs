using System.Security.Claims;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database;
using Server.Mappers;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Tasks;

public class Create : EndpointBaseAsync
    .WithRequest<CreateTaskReq>
    .WithActionResult<TaskDto>
{
    private readonly AppDbContext _context;

    public Create(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpPost(ApiRoutes.Tasks)]
    [SwaggerOperation(
        Summary = "Create new Task",
        Description = "",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult<TaskDto>> HandleAsync(
        [FromBody] CreateTaskReq req,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        var entity = req.ToTaskEntity();
        entity.UserId = userId;

        _context.Tasks.Add(entity);
        await _context.SaveChangesAsync(ct);

        return new ObjectResult(entity.ToTaskDto())
        {
            StatusCode = StatusCodes.Status201Created
        };
    }
}