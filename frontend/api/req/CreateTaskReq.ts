import type { BaseReq } from "./BaseReq";

interface CreateTaskReq extends BaseReq {
  title: string;
  description?: string | undefined;
  dueDate?: string | undefined;
  dueTime?: string | undefined;
}

export type { CreateTaskReq };
