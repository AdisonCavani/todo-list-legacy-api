import { z } from "zod";

const HealthCheckDtoSchema = z.object({
  status: z.string(),
  component: z.string(),
  description: z.string().nullish(),
});

type HealthCheckDto = z.infer<typeof HealthCheckDtoSchema>;

export type { HealthCheckDto };
export { HealthCheckDtoSchema };
