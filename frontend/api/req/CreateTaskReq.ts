import { z } from "zod";

const CreateTaskReqSchema = z.object({
  title: z.string(),
  description: z.optional(z.string().nullable()),
  dueDate: z.optional(z.string().nullable()),
});

type CreateTaskReq = z.infer<typeof CreateTaskReqSchema>;

export { CreateTaskReqSchema };
export type { CreateTaskReq };
