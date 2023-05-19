using Dapper;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Server.Database;

namespace Server.Startup;

public class MySqlHealthCheck : IHealthCheck
{
    private readonly ISqlConnectionFactory _connectionFactory;

    public MySqlHealthCheck(ISqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
    {
        try
        {
            await using var connection = _connectionFactory.Create();
            await connection.QueryAsync("DESCRIBE task;", ct);

            return HealthCheckResult.Healthy();
        }

        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy(ex.Message);
        }
    }
}