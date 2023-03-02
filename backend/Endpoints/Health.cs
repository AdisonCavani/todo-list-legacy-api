using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Server.Contracts;
using Server.Contracts.Dtos;
using Server.Contracts.Responses;
using Swashbuckle.AspNetCore.Annotations;

namespace Server.Endpoints;

public class Health : EndpointBaseAsync
    .WithoutRequest
    .WithActionResult<HealthCheckRes>
{
    private readonly HealthCheckService _healthCheckService;

    public Health(HealthCheckService healthCheckService)
    {
        _healthCheckService = healthCheckService;
    }

    [HttpGet(ApiRoutes.Health)]
    [SwaggerOperation(Tags = new[] {"Health Endpoint"})]
    public override async Task<ActionResult<HealthCheckRes>> HandleAsync(
        CancellationToken ct = default)
    {
        var report = await _healthCheckService.CheckHealthAsync(ct);
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
            ? Ok(response)
            : StatusCode(StatusCodes.Status503ServiceUnavailable, response);
    }
}