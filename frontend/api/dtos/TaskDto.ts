import { z } from "zod";

const TaskDtoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  dueDate: z.string().nullish(),
  dueTime: z.string().nullish(),
  isCompleted: z.boolean(),
  isImportant: z.boolean(),
});

type TaskDto = z.infer<typeof TaskDtoSchema>;

export { TaskDtoSchema };
export type { TaskDto };
