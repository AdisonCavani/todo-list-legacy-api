using System.Security.Claims;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Database;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Task;

public class List : EndpointBaseAsync
    .WithRequest<PaginatedReq>
    .WithActionResult<PaginatedRes<TaskDto>>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public List(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet(ApiRoutes.Task)]
    [SwaggerOperation(
        Summary = "Get a list of Tasks",
        Description = "Returns a paginated list of Tasks",
        Tags = new[] {"Task Endpoint"})]
    public override async Task<ActionResult<PaginatedRes<TaskDto>>> HandleAsync(
        [FromQuery] PaginatedReq req,
        CancellationToken ct = default)
    {
        // TODO: check for null during unit test
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        if (!await _context.Tasks.Where(x => x.UserId == userId).AnyAsync(ct))
            return NoContent();

        var postsCount = await _context.Tasks.CountAsync(ct);
        var pageCount = Math.Ceiling(postsCount / (float) req.PageSize);

        if (req.Page > pageCount)
            return NotFound();

        var posts = await _context.Tasks
            .OrderByDescending(x => x.CreatedAt)
            .Skip((req.Page - 1) * req.PageSize)
            .Take(req.PageSize)
            .ToListAsync(ct);

        var res = new PaginatedRes<TaskDto>
        {
            Data = _mapper.Map<List<TaskDto>>(posts),
            CurrentPage = req.Page,
            PageSize = req.PageSize,
            TotalPages = (int) pageCount,
            TotalCount = postsCount
        };

        return Ok(res);
    }
}