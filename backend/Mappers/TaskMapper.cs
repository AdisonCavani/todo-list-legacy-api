﻿using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database.Entities;

namespace Server.Mappers;

public static class TaskMapper
{
    public static TaskDto ToTaskDto(this TaskEntity taskEntity)
    {
        return new()
        {
            Id = taskEntity.Id,
            UserId = taskEntity.UserId,
            CreatedAt = taskEntity.CreatedAt,
            Title = taskEntity.Title,
            Description = taskEntity.Description,
            DueDate = taskEntity.DueDate,
            IsCompleted = taskEntity.IsCompleted,
            IsImportant = taskEntity.IsImportant
        };
    }

    public static TaskEntity ToTaskEntity(this CreateTaskReq req)
    {
        var dateNow = DateTime.UtcNow;
        
        return new()
        {
            Id = Guid.NewGuid().ToString(),
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
            CreatedAt = dateNow,
            UpdatedAt = dateNow
        };
    }

    public static TaskEntity ToTaskEntity(this UpdateTaskReq req)
    {
        return new()
        {
            Id = req.Id.ToString(),
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
            IsCompleted = req.IsCompleted ?? false,
            IsImportant = req.IsImportant ?? false,
            UpdatedAt = DateTime.UtcNow
        };
    }
}