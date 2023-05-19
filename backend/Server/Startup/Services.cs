using Dapper;
using Server.Database;
using Server.Repositories;

namespace Server.Startup;

public static class Services
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddSingleton<ITaskRepository, TaskRepository>();
        
        SqlMapper.AddTypeHandler(new SqlDateOnlyTypeHandler());
        services.AddSingleton<ISqlConnectionFactory>(_ => new SqlConnectionFactory(
            Environment.GetEnvironmentVariable(EnvVariables.SqlConnectionString)
            ?? throw new Exception($"{nameof(EnvVariables.SqlConnectionString)} env variable cannot be null")));
    }
}