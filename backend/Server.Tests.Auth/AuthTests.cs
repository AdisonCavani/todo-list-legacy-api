using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace Server.Tests.Auth;

public class AuthTests : IClassFixture<TasksApiFactory>
{
    private readonly HttpClient _httpClient;

    public AuthTests(TasksApiFactory factory)
    {
        _httpClient = factory.HttpClient;
    }

    [Fact]
    public async Task Create_Should_RequireAuthorization()
    {
        var response = await _httpClient.PostAsJsonAsync("/api/tasks", new object());

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Delete_Should_RequireAuthorization()
    {
        var response = await _httpClient.DeleteAsync($"/api/tasks/{Guid.NewGuid()}");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Get_Should_RequireAuthorization()
    {
        var response = await _httpClient.GetAsync($"/api/tasks/{Guid.NewGuid()}");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task List_Should_RequireAuthorization()
    {
        var response = await _httpClient.GetAsync("/api/tasks");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Update_Should_RequireAuthorization()
    {
        var response = await _httpClient.PatchAsJsonAsync("/api/tasks", new object());

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}