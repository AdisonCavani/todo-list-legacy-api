using Amazon.XRay.Recorder.Handlers.AwsSdk;
using Microsoft.AspNetCore.Authorization;
using Serilog;
using Server.Endpoints;
using Server.Startup;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
AWSSDKHandler.RegisterXRayForAllServices();

builder.Services.AddServices(builder.Environment);
builder.Services.AddValidators();
builder.Services.AddHealthChecks().AddCheck<DynamoDbHealthCheck>(nameof(DynamoDbHealthCheck));
builder.Services.AddAuth();
builder.Services.AddAuthorization();
builder.Services.AddSwagger();
builder.Services.AddCorsPolicy();
builder.Services.AddProblemDetails();
builder.Services.AddAwsServices();

builder.Host.UseSerilog((ctx, cfg) => cfg.ReadFrom.Configuration(ctx.Configuration));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();
app.UseExceptionHandler();
app.UseHsts();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapEndpoints();

app.Run();

public partial class Program {}