import { z } from "zod";

const DeleteTaskReqSchema = z.object({
  id: z.string(),
});

type DeleteTaskReq = z.infer<typeof DeleteTaskReqSchema>;

export { DeleteTaskReqSchema };
export type { DeleteTaskReq };
