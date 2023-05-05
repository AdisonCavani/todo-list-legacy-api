using Server.Contracts.Dtos;

namespace Server.Contracts.Responses;

public class HealthCheckRes
{
    public string Status { get; set; } = default!;

    public IEnumerable<HealthCheckDto> Checks { get; set; } = Enumerable.Empty<HealthCheckDto>();

    public TimeSpan Duration { get; set; }
}