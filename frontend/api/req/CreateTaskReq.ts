import type { BaseReq } from "./BaseReq";

interface CreateTaskReq extends BaseReq {
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
}

export type { CreateTaskReq };
