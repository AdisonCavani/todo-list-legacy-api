using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using Server.Startup;
using Xunit;

namespace Server.Tests.Auth;

public class TasksApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    public HttpClient HttpClient { get; private set; } = default!;
    
    protected override IHost CreateHost(IHostBuilder builder)
    {
        Environment.SetEnvironmentVariable(EnvVariables.CorsOrigin, "http://localhost:3000");
        Environment.SetEnvironmentVariable(EnvVariables.GoogleClientId,
            "103962427268-tcl37rkfkl20942mib207j7dk2v4or4d.apps.googleusercontent.com");
        Environment.SetEnvironmentVariable(EnvVariables.TableName, "TodoListDynamoDbTable");

        builder.UseEnvironment("Test");

        return base.CreateHost(builder);
    }


    public Task InitializeAsync()
    {
        HttpClient = CreateClient();
        return Task.CompletedTask;
    }

    public new Task DisposeAsync() => Task.CompletedTask;
}