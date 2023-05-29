import { HealthCheckRes } from "@api/res/HealthCheckRes";
import { HealthCheck } from "@components/health/health-check";

export type HealthStatus = "healthy" | "degraded" | "unhealthy";

export function mapToHealth(
  title: string,
  description: string,
  dto: HealthCheckRes
) {
  const status = dto.status.toLowerCase() as HealthStatus;

  const res: HealthCheck = {
    title,
    description,
    status: status,
    message: getMessage(status),
  };

  return res;
}

function getMessage(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "Operational";
    case "degraded":
      return "Limited functionality";
    default:
      return "Non-functional";
  }
}