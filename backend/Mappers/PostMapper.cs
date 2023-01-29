using AutoMapper;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database.Entities;

namespace Server.Mappers;

public class PostMapper : Profile
{
    public PostMapper()
    {
        CreateMap<PostEntity, PostDto>();
        CreateMap<CreatePostReq, PostEntity>();
        CreateMap<UpdatePostReq, PostEntity>();
    }
}