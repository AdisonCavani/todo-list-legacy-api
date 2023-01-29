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

public class Update : EndpointBaseAsync
    .WithRequest<UpdatePostReq>
    .WithActionResult<PostDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public Update(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPatch(ApiRoutes.Post.Update)]
    [SwaggerOperation(Tags = new[] { "Post Endpoint" })]
    public override async Task<ActionResult<PostDto>> HandleAsync(
        [FromBody] UpdatePostReq req,
        CancellationToken ct = default)
    {
        var entity = await _context.Posts.FirstOrDefaultAsync(x => x.Id == req.Id, ct);

        if (entity is null)
            return NotFound();

        _mapper.Map(req, entity);
        await _context.SaveChangesAsync(ct);
        return Ok(_mapper.Map<PostDto>(entity));
    }
}