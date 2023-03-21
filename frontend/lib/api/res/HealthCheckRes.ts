import type { HealthCheckDto } from "@api/dtos/HealthCheckDto";

type HealthCheckRes = {
  status: string;
  checks: HealthCheckDto[];
  duration: string;
};

export type { HealthCheckRes };
