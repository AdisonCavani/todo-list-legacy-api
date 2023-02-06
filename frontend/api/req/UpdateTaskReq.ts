import type { BaseReq } from "./BaseReq";

interface UpdateTaskReq extends BaseReq {
  id: string;
  title: string;
  description?: string | undefined;
  dueDate?: string | undefined;
  dueTime?: string | undefined;
  isCompleted?: boolean;
}

export type { UpdateTaskReq };
