using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using Server.Repositories;
using Xunit;

namespace Server.UnitTests.Endpoints.Tasks;

public class DeleteTests
{
    private readonly ITaskRepository _repository = Substitute.For<ITaskRepository>();

    [Fact]
    public async Task WhenUserIdNull_Returns500()
    {
        // Arrange
        var request = Guid.NewGuid();

        // Act
        var response = await Server.Endpoints.Tasks.Delete.HandleAsync(
            request,
            new DefaultHttpContext(),
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);

        var errorResponse = (StatusCodeHttpResult) response.Result;

        Assert.Equal(StatusCodes.Status500InternalServerError, errorResponse.StatusCode);
    }

    [Fact]
    public async Task WhenRepoReturnsFalse_Returns404()
    {
        // Arrange
        var request = Guid.NewGuid();

        _repository.DeleteAsync(request, Helpers.UserId.ToString()).Returns(false);

        // Act
        var response = await Server.Endpoints.Tasks.Delete.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<NotFound>(response.Result);
    }

    [Fact]
    public async Task WhenRepoReturnsTrue_Returns404()
    {
        // Arrange
        var request = Guid.NewGuid();

        _repository.DeleteAsync(request, Helpers.UserId.ToString()).Returns(true);

        // Act
        var response = await Server.Endpoints.Tasks.Delete.HandleAsync(
            request,
            Helpers.ValidHttpContext,
            _repository);

        // Assert
        Assert.IsAssignableFrom<IResult>(response);
        Assert.IsType<NoContent>(response.Result);
    }
}