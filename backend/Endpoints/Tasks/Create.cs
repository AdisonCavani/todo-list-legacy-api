using System.Security.Claims;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Repositories;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Tasks;

public class Create : EndpointBaseAsync
    .WithRequest<CreateTaskReq>
    .WithActionResult<TaskDto>
{
    private readonly ITaskRepository _repo;

    public Create(ITaskRepository repo)
    {
        _repo = repo;
    }

    [Authorize]
    [HttpPost(ApiRoutes.Tasks)]
    [SwaggerOperation(
        Summary = "Create new Task",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult<TaskDto>> HandleAsync(
        [FromBody] CreateTaskReq req,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        var response = await _repo.CreateAsync(req, userId, ct);

        if (response is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        return new ObjectResult(response)
        {
            StatusCode = StatusCodes.Status201Created
        };
    }
}