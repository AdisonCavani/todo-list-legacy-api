import { z } from "zod";

const UpdateTaskReqSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.optional(z.string().nullable()),
  dueDate: z.optional(z.string().nullable()),
  isCompleted: z.optional(z.boolean()),
  isImportant: z.optional(z.boolean()),
});

type UpdateTaskReq = z.infer<typeof UpdateTaskReqSchema>;

export { UpdateTaskReqSchema };
export type { UpdateTaskReq };
