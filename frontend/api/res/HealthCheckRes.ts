import type { HealthCheckDto } from "@api/dtos/HealthCheckDto";
import type { BaseRes } from "./BaseRes";

interface HealthCheckRes extends BaseRes {
  status: string;
  checks: HealthCheckDto[];
  duration: string;
}

export type { HealthCheckRes };
