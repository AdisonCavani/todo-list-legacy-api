import type { BaseRes } from "./BaseRes";

interface PaginatedRes<T> extends BaseRes {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export type { PaginatedRes };
