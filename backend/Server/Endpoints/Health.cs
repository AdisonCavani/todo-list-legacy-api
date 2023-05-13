using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Server.Contracts.Dtos;
using Server.Contracts.Responses;

namespace Server.Endpoints;

public static class Health
{
    internal static async Task<Results<StatusCodeHttpResult, Ok<HealthCheckRes>>> HandleAsync(
        HealthCheckService service,
        CancellationToken ct = default)
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
            ? TypedResults.Ok(response)
            : TypedResults.StatusCode(StatusCodes.Status503ServiceUnavailable); // TODO: add response
    }
}