type PaginatedRes<T> = {
  data: T[];
  pageKey?: string | null | undefined;
  pageSize: number;
  nextPageKey?: string | null | undefined;
};

export type { PaginatedRes };
