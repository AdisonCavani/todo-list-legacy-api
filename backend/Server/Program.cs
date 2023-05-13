using Amazon.XRay.Recorder.Handlers.AwsSdk;
using Server.Endpoints;
using Server.Startup;

var builder = WebApplication.CreateSlimBuilder(args);

// Add services to the container.
AWSSDKHandler.RegisterXRayForAllServices();

builder.Services.AddLogger(builder.Configuration);
builder.Services.AddServices();
builder.Services.AddValidators();
builder.Services.AddHealthChecks().AddCheck<DynamoDbHealthCheck>(nameof(DynamoDbHealthCheck));
builder.Services.AddAuth();
builder.Services.AddAuthorization();
builder.Services.AddSwagger();
builder.Services.AddCorsPolicy();
builder.Services.AddProblemDetails();
builder.Services.AddAwsServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseHsts();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapEndpoints();

app.Run();