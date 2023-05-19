using Dapper;
using Server.Contracts.Dtos;
using Server.Contracts.Entities;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Database;
using Server.Mappers;

namespace Server.Repositories;

// TODO: use CancellationToken, see: https://stackoverflow.com/questions/25540793/cancellationtoken-with-async-dapper-methods
public class TaskRepository : ITaskRepository
{
    private readonly ISqlConnectionFactory _connectionFactory;

    public TaskRepository(ISqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<TaskDto?> CreateAsync(CreateTaskReq req, string userId, CancellationToken ct = default)
    {
        var entity = req.ToTaskEntity(userId);
        var sql = @"
                INSERT INTO `task` (`id`, `user_id`, `title`, `description`, `due_date`, `is_completed`, `is_important`)
                VALUES (@Id, @UserId, @Title, @Description, @DueDate, @IsCompleted, @IsImportant)";

        await using var connection = _connectionFactory.Create();
        await connection.ExecuteAsync(sql, entity);

        return entity.ToTaskDto();
    }

    public async Task<TaskDto?> GetAsync(Guid id, string userId, CancellationToken ct = default)
    {
        var sql = @"
                SELECT *
                FROM `task`
                WHERE `id` = @Id AND `user_id` = @UserId";

        await using var connection = _connectionFactory.Create();
        var response = await connection.QueryFirstOrDefaultAsync<TaskEntity>(sql, new {Id = id, UserId = userId});

        return response?.ToTaskDto();
    }

    public async Task<TaskDto?> UpdateAsync(UpdateTaskReq req, string userId, CancellationToken ct = default)
    {
        var entity = req.ToTaskEntity(userId);

        var sql = @"
                UPDATE `task`
                SET `title` = @Title,
                    `description` = @Description,
                    `due_date` = @DueDate,
                    `is_completed` = @IsCompleted,
                    `is_important` = @IsImportant
                WHERE `id` = @Id AND `user_id` = @UserId";

        await using var connection = _connectionFactory.Create();
        await connection.ExecuteAsync(sql, entity);

        return entity.ToTaskDto();
    }

    public async Task<bool> DeleteAsync(Guid id, string userId, CancellationToken ct = default)
    {
        var sql = @"
                DELETE FROM `task`
                WHERE `id` = @Id
                AND `user_id` = @UserId";

        await using var connection = _connectionFactory.Create();
        var rowsAffected = await connection.ExecuteAsync(sql, new {Id = id, UserId = userId});

        return rowsAffected > 0;
    }

    public async Task<PaginatedRes<TaskDto>> ListAsync(PaginatedReq req, string userId, CancellationToken ct = default)
    {
        var sql = @"
                SELECT *
                FROM `task`
                LIMIT @PageSize OFFSET @Offset";

        int offset = (req.Page - 1) * req.PageSize;

        await using var connection = _connectionFactory.Create();
        var response = await connection.QueryAsync<TaskEntity>(sql, new {req.PageSize, Offset = offset});

        return new()
        {
            Data = response.Select(x => x.ToTaskDto()),
            Page = req.Page,
            PageSize = req.PageSize
        };
    }
}