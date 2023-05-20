using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Mappers;
using Server.Startup;

namespace Server.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly IAmazonDynamoDB _client;

    private static readonly string TasksTableName =
        Environment.GetEnvironmentVariable(EnvVariables.TableName) ??
        throw new Exception(
            $"{nameof(EnvVariables.TableName)} env variable cannot be null");

    public TaskRepository(IAmazonDynamoDB client)
    {
        _client = client;
    }

    public async Task<TaskDto?> CreateAsync(CreateTaskReq req, string userId, CancellationToken ct = default)
    {
        var entity = req.ToTaskEntity(userId);

        var createItemReq = new PutItemRequest
        {
            TableName = TasksTableName,
            Item = DynamoDbMapper.ToDict(entity)
        };

        var response = await _client.PutItemAsync(createItemReq, ct);

        if (response.HttpStatusCode != HttpStatusCode.OK)
            return null;

        return entity.ToTaskDto();
    }

    public async Task<TaskDto?> GetAsync(Guid id, string userId, CancellationToken ct = default)
    {
        var request = new GetItemRequest
        {
            TableName = TasksTableName,
            Key = new()
            {
                {TaskMapper.Pk, TaskMapper.GetPk(userId)},
                {TaskMapper.Sk, TaskMapper.GetSk(id)}
            }
        };

        var response = await _client.GetItemAsync(request, ct);

        if (!response.IsItemSet)
            return null;

        return DynamoDbMapper.FromDict(response.Item)?.ToTaskDto();
    }

    public async Task<TaskDto?> UpdateAsync(UpdateTaskReq req, string userId, CancellationToken ct = default)
    {
        var entity = req.ToTaskEntity(userId);

        var updateItemReq = new PutItemRequest
        {
            TableName = TasksTableName,
            Item = DynamoDbMapper.ToDict(entity)
        };

        var response = await _client.PutItemAsync(updateItemReq, ct);

        if (response.HttpStatusCode != HttpStatusCode.OK)
            return null;

        return entity.ToTaskDto();
    }

    public async Task<bool> DeleteAsync(Guid id, string userId, CancellationToken ct = default)
    {
        var deleteItemReq = new DeleteItemRequest
        {
            TableName = TasksTableName,
            Key = new()
            {
                {TaskMapper.Pk, TaskMapper.GetPk(userId)},
                {TaskMapper.Sk, TaskMapper.GetSk(id)}
            }
        };

        var response = await _client.DeleteItemAsync(deleteItemReq, ct);
        return response.HttpStatusCode == HttpStatusCode.OK;
    }

    public async Task<PaginatedRes<TaskDto>> ListAsync(PaginatedReq req, string userId, CancellationToken ct = default)
    {
        var exclusiveStartKey = string.IsNullOrWhiteSpace(req.PageKey)
            ? null
            : JsonSerializer.Deserialize<Dictionary<string, AttributeValue>>(Convert.FromBase64String(req.PageKey));

        var queryRequest = new QueryRequest
        {
            TableName = TasksTableName,
            Limit = req.PageSize,
            ExclusiveStartKey = exclusiveStartKey,
            KeyConditionExpression = $"{TaskMapper.Pk} = :v_pk",
            ExpressionAttributeValues = new()
            {
                {":v_pk", TaskMapper.GetPk(userId)}
            }
        };

        var response = await _client.QueryAsync(queryRequest, ct);

        var tasks = new List<TaskDto>();

        foreach (var item in response.Items)
        {
            var taskEntity = DynamoDbMapper.FromDict(item);

            if (taskEntity is not null)
                tasks.Add(taskEntity.ToTaskDto());
        }

        var nextPageKey = response.LastEvaluatedKey.Count == 0
            ? null
            : Convert.ToBase64String(JsonSerializer.SerializeToUtf8Bytes(response.LastEvaluatedKey,
                new JsonSerializerOptions
                {
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
                }));

        return new()
        {
            PageKey = req.PageKey,
            PageSize = req.PageSize,
            Data = tasks,
            NextPageKey = nextPageKey
        };
    }
}