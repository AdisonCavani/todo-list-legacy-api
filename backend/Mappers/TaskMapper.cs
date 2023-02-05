using AutoMapper;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database.Entities;

namespace Server.Mappers;

public class TaskMapper : Profile
{
    public TaskMapper()
    {
        CreateMap<TaskEntity, TaskDto>();
        CreateMap<CreateTaskReq, TaskEntity>();
        CreateMap<UpdateTaskReq, TaskEntity>();
    }
}