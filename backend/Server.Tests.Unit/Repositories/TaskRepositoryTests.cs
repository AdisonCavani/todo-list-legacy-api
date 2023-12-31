﻿using System.Net;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using NSubstitute;
using Server.Contracts.Entities;
using Server.Contracts.Requests;
using Server.Mappers;
using Server.Repositories;

namespace Server.Tests.Unit.Repositories;

public class TaskRepositoryTests
{
    private static readonly IAmazonDynamoDB AmazonDynamoDb = Substitute.For<IAmazonDynamoDB>();
    private readonly ITaskRepository _repository = new TaskRepository(AmazonDynamoDb);

    public TaskRepositoryTests()
    {
        Environment.SetEnvironmentVariable(Startup.EnvVariables.TableName, "tasks");
    }

    [Fact]
    public async Task CreateAsync_Should_ReturnNull_WhenNotOk()
    {
        // Arrange
        var request = new CreateTaskReq
        {
            Title = "New task"
        };

        var responseDto = new PutItemResponse
        {
            HttpStatusCode = HttpStatusCode.Forbidden
        };

        AmazonDynamoDb.PutItemAsync(Arg.Any<PutItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.CreateAsync(request, Helpers.UserId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task CreateAsync_Should_ReturnOk_WhenOk()
    {
        // Arrange
        var request = new CreateTaskReq
        {
            Title = "New task"
        };

        var responseDto = new PutItemResponse
        {
            HttpStatusCode = HttpStatusCode.OK
        };

        AmazonDynamoDb.PutItemAsync(Arg.Any<PutItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.CreateAsync(request, Helpers.UserId);

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public async Task GetAsync_Should_ReturnNull_WhenNotOk()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new GetItemResponse
        {
            HttpStatusCode = HttpStatusCode.NotFound
        };

        AmazonDynamoDb.GetItemAsync(Arg.Any<GetItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.GetAsync(request, Helpers.UserId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task GetAsync_Should_ReturnOk_WhenOk()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new GetItemResponse
        {
            HttpStatusCode = HttpStatusCode.OK,
            IsItemSet = true,
            Item = DynamoDbMapper.ToDict(new TaskEntity
            {
                Id = request.ToString(),
                Title = "New task"
            })
        };

        AmazonDynamoDb.GetItemAsync(Arg.Any<GetItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.GetAsync(request, Helpers.UserId);

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public async Task UpdateAsync_Should_ReturnNull_WhenNotOk()
    {
        // Arrange
        var request = new UpdateTaskReq
        {
            Id = Guid.NewGuid(),
            Title = "Updated task"
        };

        var responseDto = new PutItemResponse
        {
            HttpStatusCode = HttpStatusCode.NotFound
        };

        AmazonDynamoDb.PutItemAsync(Arg.Any<PutItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.UpdateAsync(request, Helpers.UserId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsync_Should_ReturnOk_WhenOk()
    {
        // Arrange
        var request = new UpdateTaskReq
        {
            Id = Guid.NewGuid(),
            Title = "Updated task"
        };

        var item = request.ToTaskEntity(Helpers.UserId);

        var responseDto = new PutItemResponse
        {
            HttpStatusCode = HttpStatusCode.OK,
            Attributes = DynamoDbMapper.ToDict(item)
        };

        AmazonDynamoDb.PutItemAsync(Arg.Any<PutItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.UpdateAsync(request, Helpers.UserId);

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public async Task DeleteAsync_Should_ReturnFalse_WhenNotOk()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new DeleteItemResponse
        {
            HttpStatusCode = HttpStatusCode.NotFound
        };

        AmazonDynamoDb.DeleteItemAsync(Arg.Any<DeleteItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.DeleteAsync(request, Helpers.UserId);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public async Task DeleteAsync_Should_ReturnTrue_WhenOk()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new DeleteItemResponse
        {
            HttpStatusCode = HttpStatusCode.OK,
            Attributes = new Dictionary<string, AttributeValue>
            {
                { "", new AttributeValue() }
            }
        };

        AmazonDynamoDb.DeleteItemAsync(Arg.Any<DeleteItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.DeleteAsync(request, Helpers.UserId);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task ListAsync_Should_ReturnOk()
    {
        // Arrange
        var items = new List<TaskEntity>
        {
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Task"
            }
        };

        var responseDto = new QueryResponse
        {
            HttpStatusCode = HttpStatusCode.OK,
            Items = items.Select(DynamoDbMapper.ToDict).ToList()
        };

        AmazonDynamoDb.QueryAsync(Arg.Any<QueryRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.ListAsync(new PaginatedReq
        {
            PageSize = 5
        }, Helpers.UserId);

        // Assert
        Assert.NotNull(result);
        Assert.Equivalent(items.Select(item => item.ToTaskDto()), result.Data);
    }
}