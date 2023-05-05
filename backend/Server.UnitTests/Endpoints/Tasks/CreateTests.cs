using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Repositories;
using Xunit;

namespace Server.UnitTests.Endpoints.Tasks;

public class CreateTests
{
    private readonly ITaskRepository _repository = Substitute.For<ITaskRepository>();

    [Fact]
    public async Task WhenUserIdNull_Returns500()
    {
        // Arrange
        var request = new CreateTaskReq();

        // Act
        var response = await Server.Endpoints.Tasks.Create.HandleAsync(
            request,
            new DefaultHttpContext(),
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);

        var errorResponse = (StatusCodeHttpResult) response.Result;

        Assert.Equal(StatusCodes.Status500InternalServerError, errorResponse.StatusCode);
    }

    [Fact]
    public async Task WhenRepoReturnsNull_Returns500()
    {
        // Arrange
        var request = new CreateTaskReq
        {
            Title = "New task"
        };

        // Act
        var response = await Server.Endpoints.Tasks.Create.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<StatusCodeHttpResult>(response.Result);

        var errorResponse = (StatusCodeHttpResult) response.Result;

        Assert.Equal(StatusCodes.Status500InternalServerError, errorResponse.StatusCode);
    }

    [Fact]
    public async Task WhenOk_ReturnsOk()
    {
        // Arrange
        var request = new CreateTaskReq
        {
            Title = "New task"
        };

        var responseDto = new TaskDto
        {
            Title = request.Title,
            UserId = Helpers.UserId.ToString()
        };


        _repository.CreateAsync(request, Helpers.UserId.ToString()).Returns(responseDto);

        // Act
        var response = await Server.Endpoints.Tasks.Create.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<Ok<TaskDto>>(response.Result);

        var okResponse = (Ok<TaskDto>) response.Result;

        Assert.Equal(responseDto, okResponse.Value);
    }
}