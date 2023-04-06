using System.Security.Claims;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Repositories;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Tasks;

public class List : EndpointBaseAsync
    .WithRequest<PaginatedReq>
    .WithActionResult<PaginatedRes<TaskDto>>
{
    private readonly ITaskRepository _repo;

    public List(ITaskRepository repo)
    {
        _repo = repo;
    }

    [Authorize]
    [HttpGet(ApiRoutes.Tasks)]
    [SwaggerOperation(
        Summary = "Get a list of Tasks",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult<PaginatedRes<TaskDto>>> HandleAsync(
        [FromQuery] PaginatedReq req,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        var response = await _repo.ListAsync(req, userId, ct);
        return Ok(response);
    }
}