using Microsoft.Extensions.Diagnostics.HealthChecks;
using Server.Contracts.Dtos;
using Server.Contracts.Responses;

namespace Server.Endpoints;

public static class Health
{
    public static async Task<IResult> HandleAsync(HealthCheckService service,CancellationToken ct = default)
    {
        var report = await service.CheckHealthAsync(ct);
        var response = new HealthCheckRes
        {
            Status = report.Status.ToString(),
            Checks = report.Entries.Select(x => new HealthCheckDto
            {
                Component = x.Key,
                Status = x.Value.Status.ToString(),
                Description = x.Value.Description
            }),
            Duration = report.TotalDuration
        };

        return report.Status == HealthStatus.Healthy
            ? Results.Ok(response)
            : Results.StatusCode(StatusCodes.Status503ServiceUnavailable); // TODO: add response
    }
}