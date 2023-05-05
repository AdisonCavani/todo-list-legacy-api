using System.Net;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using NSubstitute;
using Server.Contracts.Requests;
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
}