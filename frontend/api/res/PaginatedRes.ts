import { z } from "zod";

function PaginatedResSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    data: z.array(schema),
    currentPage: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
    totalCount: z.number(),
  });
}

type PaginatedRes<T> = {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export { PaginatedResSchema };
export type { PaginatedRes };
