using System.Net;
using System.Text.Json;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.Extensions.Options;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Database.Entities;
using Server.Mappers;
using Server.Options;

namespace Server.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly IAmazonDynamoDB _client;
    private readonly IOptions<AppOptions> _options;

    public TaskRepository(IAmazonDynamoDB client, IOptions<AppOptions> options)
    {
        _client = client;
        _options = options;
    }

    public async Task<TaskDto?> CreateAsync(CreateTaskReq req, string userId, CancellationToken ct = default)
    {
        var entity = req.ToTaskEntity();
        entity.UserId = userId;

        var taskAsJson = JsonSerializer.Serialize(entity);
        var itemAsDoc = Document.FromJson(taskAsJson);
        var itemAsAttrib = itemAsDoc.ToAttributeMap();

        var createItemReq = new PutItemRequest
        {
            TableName = _options.Value.TableName,
            Item = itemAsAttrib
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
            TableName = _options.Value.TableName,
            Key = new()
            {
                {"pk", new AttributeValue {S = id.ToString()}},
                {"sk", new AttributeValue {S = id.ToString()}},
            }
        };

        var response = await _client.GetItemAsync(request, ct);

        if (!response.IsItemSet)
            return null;

        var itemAsDoc = Document.FromAttributeMap(response.Item);
        return JsonSerializer.Deserialize<TaskEntity>(itemAsDoc.ToJson())?.ToTaskDto();
    }

    public async Task<TaskDto?> UpdateAsync(UpdateTaskReq req, string userId, CancellationToken ct = default)
    {
        var entity = req.ToTaskEntity();
        var taskAsJson = JsonSerializer.Serialize(entity);
        var itemAsDoc = Document.FromJson(taskAsJson);
        var itemAsAttrib = itemAsDoc.ToAttributeMap();

        var updateItemReq = new PutItemRequest
        {
            TableName = _options.Value.TableName,
            Item = itemAsAttrib
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
            TableName = _options.Value.TableName,
            Key = new()
            {
                {"pk", new AttributeValue {S = id.ToString()}},
                {"sk", new AttributeValue {S = id.ToString()}}
            }
        };

        var response = await _client.DeleteItemAsync(deleteItemReq, ct);
        return response.HttpStatusCode == HttpStatusCode.OK;
    }

    public async Task<PaginatedRes<TaskDto>> ListAsync(PaginatedReq req, string userId, CancellationToken ct = default)
    {
        var scanReq = new ScanRequest
        {
            TableName = _options.Value.TableName,
            Limit = req.PageSize
        };

        var response = await _client.ScanAsync(scanReq, ct);

        var tasks = new List<TaskDto>();

        foreach (var item in response.Items)
        {
            var itemAsDoc = Document.FromAttributeMap(item);
            var taskEntity = JsonSerializer.Deserialize<TaskEntity>(itemAsDoc.ToJson());

            if (taskEntity is not null)
                tasks.Add(taskEntity.ToTaskDto());
        }
        
        // TODO: improve pagination
        return new()
        {
            CurrentPage = req.Page,
            PageSize = req.PageSize,
            Data = tasks,
            TotalCount = 0,
            TotalPages = 0
        };
    }
}