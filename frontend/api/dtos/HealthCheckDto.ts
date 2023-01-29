import type { BaseDto } from "./BaseDto";

interface HealthCheckDto extends BaseDto {
  status: string;
  component: string;
  description?: string | undefined;
}

export type { HealthCheckDto };
