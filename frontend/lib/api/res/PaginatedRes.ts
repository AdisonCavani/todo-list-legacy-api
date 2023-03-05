import { TaskDtoSchema } from "@api/dtos/TaskDto";
import { z } from "zod";

function PaginatedResSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    data: z.array(schema),
    currentPage: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
    totalCount: z.number(),
  });
}

const PaginatedResTaskDtoSchema = PaginatedResSchema(TaskDtoSchema);
type PaginatedResTaskDto = z.infer<typeof PaginatedResTaskDtoSchema>;

export { PaginatedResTaskDtoSchema };
export type { PaginatedResTaskDto };
