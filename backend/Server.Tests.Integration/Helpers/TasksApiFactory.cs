using Amazon.DynamoDBv2;
using Amazon.Runtime;
using Ductus.FluentDocker.Builders;
using Ductus.FluentDocker.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Server.Startup;

namespace Server.Tests.Integration.Helpers;

public class TasksApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly ICompositeService _container = new Builder()
        .UseContainer()
        .UseCompose()
        .WithEnvironment("PORT=8001")
        .FromFile(Path.Combine(
            Directory.GetParent(Directory.GetCurrentDirectory())?.Parent?.Parent?.Parent?.Parent?.FullName!,
            "docker-compose.yaml"))
        .RemoveOrphans()
        .ServiceName("todo-list-test-db")
        .Build();

    public HttpClient HttpClient { get; private set; } = default!;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            var credentials = new BasicAWSCredentials("0", "0");
            
            var config = new AmazonDynamoDBConfig
            {
                ServiceURL = "http://localhost:8001"
            };
            
            services.RemoveAll<IAmazonDynamoDB>();
            services.AddSingleton<IAmazonDynamoDB>(_ => new AmazonDynamoDBClient(credentials, config));

            services
                .AddAuthentication(TestAuthHandler.AuthenticationSchemeName)
                .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(TestAuthHandler.AuthenticationSchemeName,
                    _ => { });

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(TestAuthHandler.AuthenticationSchemeName)
                    .RequireAuthenticatedUser()
                    .Build();
            });
        });

        base.ConfigureWebHost(builder);
    }

    protected override IHost CreateHost(IHostBuilder builder)
    {
        Environment.SetEnvironmentVariable(EnvVariables.CognitoAuthority,
            "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_N5gpeDsBt");
        Environment.SetEnvironmentVariable(EnvVariables.CorsOrigin, "http://localhost:3000");
        Environment.SetEnvironmentVariable(EnvVariables.GoogleClientId,
            "103962427268-tcl37rkfkl20942mib207j7dk2v4or4d.apps.googleusercontent.com");
        Environment.SetEnvironmentVariable(EnvVariables.TableName, "TodoListDynamoDbTable");

        builder.UseEnvironment("Test");

        return base.CreateHost(builder);
    }

    public Task InitializeAsync()
    {
        _container.Start();
        HttpClient = CreateClient();

        return Task.CompletedTask;
    }

    public new Task DisposeAsync()
    {
        _container.Stop();
        _container.Dispose();

        return Task.CompletedTask;
    }
}