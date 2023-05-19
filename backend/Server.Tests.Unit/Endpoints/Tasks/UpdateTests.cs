using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Repositories;
using Xunit;

namespace Server.Tests.Unit.Endpoints.Tasks;

public class UpdateTests
{
    private readonly ITaskRepository _repository = Substitute.For<ITaskRepository>();

    [Fact]
    public async Task Should_Return500_WhenUserIdIsNull()
    {
        // Arrange
        var request = new UpdateTaskReq();

        // Act
        var response = await Server.Endpoints.Tasks.Update.HandleAsync(
            request,
            new DefaultHttpContext(),
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);

        var errorResponse = (StatusCodeHttpResult) response.Result;

        Assert.Equal(StatusCodes.Status500InternalServerError, errorResponse.StatusCode);
    }

    [Fact]
    public async Task Should_Return404_WhenRepoReturnsNull()
    {
        // Arrange
        var request = new UpdateTaskReq();

        // Act
        var response = await Server.Endpoints.Tasks.Update.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<NotFound>(response.Result);
    }

    [Fact]
    public async Task Should_ReturnOk_WhenRepoReturnsTrue()
    {
        // Arrange
        var request = new UpdateTaskReq
        {
            Id = Guid.NewGuid(),
            Title = "Updated task"
        };

        var responseDto = new TaskDto
        {
            Id = request.Id,
            Title = request.Title
        };

        _repository.UpdateAsync(request, Helpers.UserId).Returns(responseDto);

        // Act
        var response = await Server.Endpoints.Tasks.Update.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<Ok<TaskDto>>(response.Result);

        var okResponse = (Ok<TaskDto>) response.Result;

        Assert.NotNull(okResponse.Value);
        Assert.Equal(responseDto, okResponse.Value);
    }
}