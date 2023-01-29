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

        if (await context.Posts.AnyAsync())
            return;

        // var entities = new List<PostEntity>
        // {
        //     new()
        //     {
        //         
        //     },
        //     new()
        //     {
        //         
        //     },
        //     new()
        //     {
        //         
        //     }
        // };
        
        // await context.Posts.AddRangeAsync(entities);
        var result = await context.SaveChangesAsync();

        if (result <= 0)
            logger.LogError("Database seeding failed");
        else
            logger.LogInformation("Database seeding succeeded");
    }
}