type PaginatedRes<T> = {
  data: T[];
  page: number;
  pageSize: number;
};

export type { PaginatedRes };
