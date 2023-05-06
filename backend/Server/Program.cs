using System.Diagnostics;
using Amazon.DynamoDBv2;
using Amazon.Lambda.Serialization.SystemTextJson;
using Amazon.XRay.Recorder.Handlers.AwsSdk;
using Server;
using Server.Repositories;
using Server.Startup;

var startTime = Stopwatch.GetTimestamp();

var builder = WebApplication.CreateSlimBuilder(args);

// Add services to the container.
AWSSDKHandler.RegisterXRayForAllServices();

builder.Services.AddLogger(builder.Configuration);
builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.AddContext<SerializationContext>());
builder.Services.AddSingleton<ITaskRepository, TaskRepository>();
builder.Services.AddSingleton<IAmazonDynamoDB>(_ => new AmazonDynamoDBClient());
builder.Services.AddValidators();
builder.Services.AddHealthChecks().AddCheck<DynamoDbHealthCheck>(nameof(DynamoDbHealthCheck));
builder.Services.AddAuth();
builder.Services.AddAuthorization();
builder.Services.AddSwagger();
builder.Services.AddCorsPolicy();
builder.Services.AddProblemDetails();
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi,
    options => { options.Serializer = new SourceGeneratorLambdaJsonSerializer<SerializationContext>(); });

var app = builder.Build();

// Configure the HTTP request pipeline.
#if DEBUG
app.UseSwagger();
app.UseSwaggerUI();
#endif

app.UseExceptionHandler();
app.UseHsts();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapEndpoints();

app.MapGet("/", () => "Hello world!");
app.MapGet("/auth", () => "Hello world with auth!").RequireAuthorization();

var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
lifetime.ApplicationStarted.Register(() =>
{
    var elapsed = Stopwatch.GetElapsedTime(startTime).Milliseconds;
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogCritical("Startup completed in: {Elapsed} ms", elapsed);
});

app.Run();