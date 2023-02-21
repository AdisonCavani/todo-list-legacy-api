import { HealthCheckDtoSchema } from "@api/dtos/healthCheckDto";
import { z } from "zod";

const HealthCheckResSchema = z.object({
  status: z.string(),
  checks: z.array(HealthCheckDtoSchema),
  duration: z.string(),
});

type HealthCheckRes = z.infer<typeof HealthCheckResSchema>;

export { HealthCheckResSchema };
export type { HealthCheckRes };
