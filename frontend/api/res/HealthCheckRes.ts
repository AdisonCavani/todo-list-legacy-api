import type { HealthCheckDto } from "@api/dtos/healthCheckDto";

type HealthCheckRes = {
  status: string;
  checks: HealthCheckDto[];
  duration: string;
};

export type { HealthCheckRes };
