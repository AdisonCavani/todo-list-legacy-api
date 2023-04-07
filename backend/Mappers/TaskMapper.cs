using Amazon.DynamoDBv2.Model;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Database.Entities;

namespace Server.Mappers;

public static class TaskMapper
{
    public const string Pk = "pk";
    public const string Sk = "sk";

    public static AttributeValue GetPk(string userId) => new() {S = $"USER#{userId}"};
    public static AttributeValue GetSk(Guid taskId) => new() {S = $"TASK#{taskId.ToString()}"};

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

    public static TaskEntity ToTaskEntity(this CreateTaskReq req, string userId)
    {
        var dateNow = DateTime.UtcNow;

        return new()
        {
            Id = Guid.NewGuid().ToString(),
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
            CreatedAt = dateNow,
            UpdatedAt = dateNow,
            UserId = userId
        };
    }

    public static TaskEntity ToTaskEntity(this UpdateTaskReq req, string userId)
    {
        return new()
        {
            Id = req.Id.ToString(),
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
            IsCompleted = req.IsCompleted ?? false,
            IsImportant = req.IsImportant ?? false,
            UpdatedAt = DateTime.UtcNow,
            UserId = userId
        };
    }
}