using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using Server.Contracts.Dtos;
using Server.Repositories;
using Xunit;

namespace Server.UnitTests.Endpoints.Tasks;

public class GetTests
{
    private readonly ITaskRepository _repository = Substitute.For<ITaskRepository>();

    [Fact]
    public async Task Should_Return500_WhenUserIdIsNull()
    {
        // Arrange
        var request = Guid.NewGuid();

        // Act
        var response = await Server.Endpoints.Tasks.Get.HandleAsync(
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
        var request = Guid.NewGuid();

        // Act
        var response = await Server.Endpoints.Tasks.Get.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<NotFound>(response.Result);
    }

    [Fact]
    public async Task Should_ReturnOk_WhenOk()
    {
        // Arrange
        var request = Guid.NewGuid();

        var responseDto = new TaskDto
        {
            Id = request.ToString(),
            Title = "Task"
        };

        _repository.GetAsync(request, Helpers.UserId.ToString()).Returns(responseDto);

        // Act
        var response = await Server.Endpoints.Tasks.Get.HandleAsync(
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