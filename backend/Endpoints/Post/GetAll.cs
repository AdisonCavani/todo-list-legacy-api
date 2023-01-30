using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Database;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Post;

public class GetAll : EndpointBaseAsync
    .WithRequest<PaginatedReq>
    .WithActionResult<PaginatedRes<PostDto>>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public GetAll(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet(ApiRoutes.Post.GetAll)]
    [SwaggerOperation(Tags = new[] {"Post Endpoint"})]
    public override async Task<ActionResult<PaginatedRes<PostDto>>> HandleAsync(
        [FromQuery] PaginatedReq req,
        CancellationToken ct = default)
    {
        if (!await _context.Posts.AnyAsync(ct))
            return NoContent();

        var postsCount = await _context.Posts.CountAsync(ct);
        var pageCount = Math.Ceiling(postsCount / (float) req.PageSize);

        if (req.Page > pageCount)
            return NotFound();

        var posts = await _context.Posts
            .OrderBy(x => x.Id)
            .Skip((req.Page - 1) * req.PageSize)
            .Take(req.PageSize)
            .ToListAsync(ct);

        var res = new PaginatedRes<PostDto>
        {
            Data = _mapper.Map<List<PostDto>>(posts),
            CurrentPage = req.Page,
            PageSize = req.PageSize,
            TotalPages = (int) pageCount,
            TotalCount = postsCount
        };

        return Ok(res);
    }
}