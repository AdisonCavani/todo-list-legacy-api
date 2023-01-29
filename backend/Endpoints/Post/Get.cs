using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Post;

public class Get : EndpointBaseAsync
    .WithRequest<GetPostReq>
    .WithActionResult<PostDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public Get(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet(ApiRoutes.Post.Get)]
    [SwaggerOperation(Tags = new[] { "Post Endpoint" })]
    public override async Task<ActionResult<PostDto>> HandleAsync(
        [FromQuery] GetPostReq req,
        CancellationToken ct = default)
    {
        var entity = await _context.Posts.FirstOrDefaultAsync(x => x.Id == req.Id, ct);

        if (entity is null)
            return NotFound();
        
        return Ok(_mapper.Map<PostDto>(entity));
    }
}