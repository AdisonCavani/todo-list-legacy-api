using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;

namespace Server.Repositories;

public interface ITaskRepository
{
    Task<TaskDto?> CreateAsync(CreateTaskReq req, string userId, CancellationToken ct = default);
    Task<TaskDto?> GetAsync(Guid id, string userId, CancellationToken ct = default);
    Task<TaskDto?> UpdateAsync(UpdateTaskReq req, string userId, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, string userId, CancellationToken ct = default);
    Task<PaginatedRes<TaskDto>> ListAsync(PaginatedReq req, string userId, CancellationToken ct = default);
}