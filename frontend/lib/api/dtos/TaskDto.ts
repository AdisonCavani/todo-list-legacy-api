import { z } from "zod";

const TaskDtoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  title: z.string(),
  description: z.optional(z.string().nullable()),
  dueDate: z.optional(z.string().nullable()),
  isCompleted: z.boolean(),
  isImportant: z.boolean(),
});

type TaskDto = z.infer<typeof TaskDtoSchema>;

export { TaskDtoSchema };
export type { TaskDto };
