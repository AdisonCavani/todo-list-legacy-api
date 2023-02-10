type UpdateTaskReq = {
  id: string;
  title: string;
  description?: string | undefined;
  dueDate?: string | undefined;
  dueTime?: string | undefined;
  isCompleted?: boolean;
  isImportant?: boolean;
};

export type { UpdateTaskReq };
