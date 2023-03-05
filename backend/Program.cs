using Microsoft.AspNetCore.Authentication.JwtBearer;
using Server.Database;
using Server.Options;
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
builder.Services.ConfigureDbContext(appOptions);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();
builder.Services.AddValidators();
builder.Services.AddHealthChecks().AddDbContextCheck<AppDbContext>();
builder.Services.AddCognitoIdentity();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = appOptions.CognitoIssuer;
    options.TokenValidationParameters = new()
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
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.SeedDataAsync();
app.UseHsts();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();