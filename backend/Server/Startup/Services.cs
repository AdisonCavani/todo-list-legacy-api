using Amazon.DynamoDBv2;
using Server.Repositories;

namespace Server.Startup;

public static class Services
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddSingleton<ITaskRepository, TaskRepository>();
        services.AddSingleton<IAmazonDynamoDB>(_ => new AmazonDynamoDBClient());
    }
}