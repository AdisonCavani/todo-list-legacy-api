using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database;
using Server.Database.Entities;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints.Post;

public class Create : EndpointBaseAsync
    .WithRequest<CreatePostReq>
    .WithActionResult<PostDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public Create(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost(ApiRoutes.Post.Create)]
    [SwaggerOperation(
        Summary = "",
        Description = "",
        Tags = new[] { "Post Endpoint" })]
    public override async Task<ActionResult<PostDto>> HandleAsync(
        [FromBody] CreatePostReq req,
        CancellationToken ct = default)
    {
        var entity = _mapper.Map<PostEntity>(req);
        _context.Posts.Add(entity);
        await _context.SaveChangesAsync(ct);

        return new ObjectResult(_mapper.Map<PostDto>(entity))
        {
            StatusCode = StatusCodes.Status201Created
        };
    }
}