import { z } from "zod";

const GetTaskReqSchema = z.object({
  id: z.string(),
});

type GetTaskReq = z.infer<typeof GetTaskReqSchema>;

export { GetTaskReqSchema };
export type { GetTaskReq };
