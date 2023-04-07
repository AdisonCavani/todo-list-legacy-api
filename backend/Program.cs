using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Lambda.Serialization.SystemTextJson;
using Amazon.XRay.Recorder.Handlers.AwsSdk;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Server;
using Server.Contracts;
using Server.Endpoints;
using Server.Repositories;
using Server.Startup;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
AWSSDKHandler.RegisterXRayForAllServices();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    options.SerializerOptions.AddContext<SerializationContext>();
});
builder.Services.AddSingleton<ITaskRepository, TaskRepository>();
builder.Services.AddSingleton<IAmazonDynamoDB>(_ => new AmazonDynamoDBClient(RegionEndpoint.EUCentral1));
builder.Services.AddValidators();
builder.Services.AddHealthChecks().AddCheck<DynamoDbHealthCheck>(nameof(DynamoDbHealthCheck));
builder.Services.AddCognitoIdentity();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = Environment.GetEnvironmentVariable(EnvVariables.CognitoAuthority) ??
                        throw new Exception(
                            $"${nameof(EnvVariables.CognitoAuthority)} env variable cannot be null");
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false
    };
});
builder.Services.AddAuthorization();
builder.Services.AddSwagger();
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins(Environment.GetEnvironmentVariable(EnvVariables.CorsOrigin) ??
                         throw new Exception(
                             $"${nameof(EnvVariables.CognitoAuthority)} env variable cannot be null"));
    });
});
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi,
    options => { options.Serializer = new SourceGeneratorLambdaJsonSerializer<SerializationContext>(); });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseMiddleware(
        typeof(SimulatedLatencyMiddleware),
        TimeSpan.FromMilliseconds(250),
        TimeSpan.FromMilliseconds(1250));
}

app.UseHsts();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGroup(ApiRoutes.Tasks).MapTasksApi();
app.MapGet(ApiRoutes.Health, Health.HandleAsync).WithTags("Health Endpoint").WithOpenApi(operation => new(operation)
{
    Summary = "Get health check report"
});

app.Run();