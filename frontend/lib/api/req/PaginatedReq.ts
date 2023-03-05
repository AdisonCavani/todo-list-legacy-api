import { z } from "zod";

const PaginatedReqSchema = z.object({
  pageSize: z.number(),
  page: z.number(),
});

type PaginatedReq = z.infer<typeof PaginatedReqSchema>;

export { PaginatedReqSchema };
export type { PaginatedReq };
