using Server.Database;
using Server.Startup;

var builder = WebApplication.CreateBuilder(args);

// Program.
builder.Logging.ClearProviders().AddConsole();

// Add services to the container.
builder.Services.ConfigureDbContext(builder.Configuration);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();
builder.Services.AddValidators();
builder.Services.AddHealthChecks().AddDbContextCheck<AppDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.EnableAnnotations();
    options.DescribeAllParametersInCamelCase();
});
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

await app.SeedDataAsync(app.Logger);
app.UseHsts();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();