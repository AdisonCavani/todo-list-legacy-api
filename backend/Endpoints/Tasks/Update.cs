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

public class Update : EndpointBaseAsync
    .WithRequest<UpdateTaskReq>
    .WithActionResult<TaskDto>
{
    private readonly ITaskRepository _repo;

    public Update(ITaskRepository repo)
    {
        _repo = repo;
    }

    [Authorize]
    [HttpPatch(ApiRoutes.Tasks)]
    [SwaggerOperation(
        Summary = "Update a Task",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult<TaskDto>> HandleAsync(
        [FromBody] UpdateTaskReq req,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        var response = await _repo.UpdateAsync(req, userId, ct);

        if (response is null)
            return NotFound();

        return Ok(response);
    }
}