type UpdateTaskReq = {
  id: string;
  title: string;
  description?: string | null | undefined;
  dueDate?: string | null | undefined;
  isCompleted?: boolean | undefined;
  isImportant?: boolean | undefined;
};

export type { UpdateTaskReq };
