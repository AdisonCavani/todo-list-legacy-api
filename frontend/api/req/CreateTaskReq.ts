import { z } from "zod";

const CreateTaskReqSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  dueDate: z.string().nullish(),
  dueTime: z.string().nullish(),
});

type CreateTaskReq = z.infer<typeof CreateTaskReqSchema>;

export { CreateTaskReqSchema };
export type { CreateTaskReq };
