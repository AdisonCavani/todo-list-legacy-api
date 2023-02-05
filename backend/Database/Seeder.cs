using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;

namespace Server.Database;

public static class Seeder
{
    public static async Task SeedDataAsync(this WebApplication app, ILogger logger)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (context.Database.IsRelational())
            await context.Database.MigrateAsync();

        if (await context.Tasks.AnyAsync())
            return;

        var entities = new List<TaskEntity>
        {
            new()
            {
                Title = "Buy milk"
            },
            new()
            {
                Title = "Do homework",
                DueDate = new(2023, 01, 05)
            },
            new()
            {
                Title = "Download new music",
                DueDate = new(2023, 02, 05)
            }
        };

        await context.Tasks.AddRangeAsync(entities);
        var result = await context.SaveChangesAsync();

        if (result <= 0)
            logger.LogError("Database seeding failed");
        else
            logger.LogInformation("Database seeding succeeded");
    }
}