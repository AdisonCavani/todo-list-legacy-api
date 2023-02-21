import { z } from "zod";

const UpdateTaskReqSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.optional(z.string()),
  dueDate: z.optional(z.string()),
  dueTime: z.optional(z.string()),
  isCompleted: z.optional(z.boolean()),
  isImportant: z.optional(z.boolean()),
});

type UpdateTaskReq = z.infer<typeof UpdateTaskReqSchema>;

export { UpdateTaskReqSchema };
export type { UpdateTaskReq };
