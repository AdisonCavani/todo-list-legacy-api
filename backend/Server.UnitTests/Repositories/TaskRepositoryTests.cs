using System.Net;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using NSubstitute;
using Server.Contracts.Requests;
using Server.Database.Entities;
using Server.Mappers;
using Server.Repositories;
using Xunit;

namespace Server.UnitTests.Repositories;

public class TaskRepositoryTests
{
    private static readonly IAmazonDynamoDB AmazonDynamoDb = Substitute.For<IAmazonDynamoDB>();
    private readonly ITaskRepository _repository = new TaskRepository(AmazonDynamoDb);

    public TaskRepositoryTests()
    {
        Environment.SetEnvironmentVariable(Startup.EnvVariables.TableName, "tasks");
    }

    [Fact]
    public async Task Create_WhenNotOk_ReturnsNull()
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
        var result = await _repository.CreateAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task Create_WhenOk_ReturnsOk()
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
        var result = await _repository.CreateAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public async Task Get_WhenNotOk_ReturnsNull()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new GetItemResponse
        {
            HttpStatusCode = HttpStatusCode.NotFound
        };

        AmazonDynamoDb.GetItemAsync(Arg.Any<GetItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.GetAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task Get_WhenOk_ReturnsOk()
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
        var result = await _repository.GetAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public async Task Update_WhenNotOk_ReturnsNull()
    {
        // Arrange
        var request = new UpdateTaskReq
        {
            Id = Guid.NewGuid(),
            Title = "Updated task"
        };

        var responseDto = new UpdateItemResponse
        {
            HttpStatusCode = HttpStatusCode.NotFound
        };

        AmazonDynamoDb.UpdateItemAsync(Arg.Any<UpdateItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.UpdateAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task Update_WhenOk_ReturnsOk()
    {
        // Arrange
        var request = new UpdateTaskReq
        {
            Id = Guid.NewGuid(),
            Title = "Updated task"
        };

        var item = request.ToTaskEntity(Helpers.UserId.ToString());

        var responseDto = new PutItemResponse
        {
            HttpStatusCode = HttpStatusCode.OK,
            Attributes = DynamoDbMapper.ToDict(item)
        };

        AmazonDynamoDb.PutItemAsync(Arg.Any<PutItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.UpdateAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public async Task Delete_WhenNotOk_ReturnsNull()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new DeleteItemResponse
        {
            HttpStatusCode = HttpStatusCode.NotFound
        };

        AmazonDynamoDb.DeleteItemAsync(Arg.Any<DeleteItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.DeleteAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.False(result);
    }

    [Fact]
    public async Task Delete_WhenOk_ReturnsOk()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new DeleteItemResponse
        {
            HttpStatusCode = HttpStatusCode.OK
        };

        AmazonDynamoDb.DeleteItemAsync(Arg.Any<DeleteItemRequest>()).Returns(responseDto);

        // Act
        var result = await _repository.DeleteAsync(request, Helpers.UserId.ToString());

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task List_WhenOk_ReturnsOk()
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
        var result = await _repository.ListAsync(Helpers.UserId.ToString());

        // Assert
        Assert.NotNull(result);
        Assert.Equivalent(items.Select(item => item.ToTaskDto()), result.Data);
    }
}