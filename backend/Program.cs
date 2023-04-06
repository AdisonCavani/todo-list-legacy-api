using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Lambda.Serialization.SystemTextJson;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Server;
using Server.Options;
using Server.Repositories;
using Server.Startup;

var builder = WebApplication.CreateBuilder(args);

var environment = builder.Environment.EnvironmentName.ToLower();
builder.Configuration.AddSystemsManager($"/todo-list/{environment}", TimeSpan.FromMinutes(5));

// Settings configuration.
builder.Services
    .AddOptions<AppOptions>()
    .Bind(builder.Configuration.GetRequiredSection(AppOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

var appOptions = builder.Configuration
    .GetRequiredSection(AppOptions.SectionName)
    .Get<AppOptions>()!;

appOptions.Validate();

// Add services to the container.
builder.Services.AddSingleton<ITaskRepository, TaskRepository>();
builder.Services.AddSingleton<IAmazonDynamoDB>(_ => new AmazonDynamoDBClient(RegionEndpoint.EUCentral1));
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
        options.JsonSerializerOptions.AddContext<SerializationContext>();
    });
builder.Services.AddValidators();
builder.Services.AddHealthChecks();
builder.Services.AddCognitoIdentity();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = appOptions.CognitoIssuer;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false
    };
});
builder.Services.AddSwagger();
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins(appOptions.CorsOrigin);
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
app.MapControllers();
app.Run();