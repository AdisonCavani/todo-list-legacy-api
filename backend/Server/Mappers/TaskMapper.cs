using Server.Contracts.Dtos;
using Server.Contracts.Entities;
using Server.Contracts.Requests;

namespace Server.Mappers;

public static class TaskMapper
{
    public static TaskDto ToTaskDto(this TaskEntity taskEntity)
    {
        return new()
        {
            Id = taskEntity.Id,
            UserId = taskEntity.UserId,
            UpdatedAt = taskEntity.UpdatedAt,
            Title = taskEntity.Title,
            Description = taskEntity.Description,
            DueDate = taskEntity.DueDate,
            IsCompleted = taskEntity.IsCompleted,
            IsImportant = taskEntity.IsImportant
        };
    }

    public static TaskEntity ToTaskEntity(this CreateTaskReq req, string userId)
    {
        return new()
        {
            Id = Guid.NewGuid(),
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
            UserId = userId
        };
    }

    public static TaskEntity ToTaskEntity(this UpdateTaskReq req, string userId)
    {
        return new()
        {
            Id = req.Id,
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
            IsCompleted = req.IsCompleted ?? false,
            IsImportant = req.IsImportant ?? false,
            UserId = userId
        };
    }
}