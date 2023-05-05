using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Repositories;
using Xunit;

namespace Server.UnitTests.Endpoints.Tasks;

public class ListTests
{
    private readonly ITaskRepository _repository = Substitute.For<ITaskRepository>();

    [Fact]
    public async Task WhenUserIdNull_Returns500()
    {
        // Act
        var response = await Server.Endpoints.Tasks.List.HandleAsync(
            new DefaultHttpContext(),
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);

        var errorResponse = (StatusCodeHttpResult) response.Result;

        Assert.Equal(StatusCodes.Status500InternalServerError, errorResponse.StatusCode);
    }

    [Fact]
    public async Task WhenOk_ReturnsOk()
    {
        // Arrange
        var responseDto = new PaginatedRes<TaskDto>
        {
            Data = new List<TaskDto>()
        };

        _repository.ListAsync(Helpers.UserId.ToString()).Returns(responseDto);

        // Act
        var response = await Server.Endpoints.Tasks.List.HandleAsync(
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<Ok<PaginatedRes<TaskDto>>>(response.Result);

        var okResponse = (Ok<PaginatedRes<TaskDto>>) response.Result;

        Assert.NotNull(okResponse.Value);
        Assert.Equal(responseDto, okResponse.Value);
    }
}