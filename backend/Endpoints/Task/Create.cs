using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database;
using Server.Database.Entities;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Task;

public class Create : EndpointBaseAsync
    .WithRequest<CreateTaskReq>
    .WithActionResult<TaskDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public Create(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost(ApiRoutes.Task.Create)]
    [SwaggerOperation(
        Summary = "Create new Task",
        Description = "",
        Tags = new[] { "Task Endpoint" })]
    public override async Task<ActionResult<TaskDto>> HandleAsync(
        [FromBody] CreateTaskReq req,
        CancellationToken ct = default)
    {
        var entity = _mapper.Map<TaskEntity>(req);
        _context.Tasks.Add(entity);
        await _context.SaveChangesAsync(ct);

        return new ObjectResult(_mapper.Map<TaskDto>(entity))
        {
            StatusCode = StatusCodes.Status201Created
        };
    }
}