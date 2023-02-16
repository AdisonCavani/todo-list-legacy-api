using System.Security.Claims;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Task;

public class Update : EndpointBaseAsync
    .WithRequest<UpdateTaskReq>
    .WithActionResult<TaskDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public Update(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [Authorize]
    [HttpPatch(ApiRoutes.Task.Update)]
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

        _mapper.Map(req, entity);
        await _context.SaveChangesAsync(ct);
        return Ok(_mapper.Map<TaskDto>(entity));
    }
}