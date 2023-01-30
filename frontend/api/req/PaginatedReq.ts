import type { BaseReq } from "./BaseReq";

interface PaginatedReq extends BaseReq {
  pageSize: number;
  page: number;
}

export type { PaginatedReq };
