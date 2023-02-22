import { z } from "zod";

const TaskDtoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  description: z.optional(z.string()),
  dueDate: z.optional(z.string()),
  dueTime: z.optional(z.string()),
  isCompleted: z.boolean(),
  isImportant: z.boolean(),
});

type TaskDto = z.infer<typeof TaskDtoSchema>;

export { TaskDtoSchema };
export type { TaskDto };
