type PaginatedRes<T> = {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type { PaginatedRes };
