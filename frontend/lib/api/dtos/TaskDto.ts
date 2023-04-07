type TaskDto = {
  id: string;
  userId: string;
  updatedAt: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  description?: string | null | undefined;
  dueDate?: string | null | undefined;
};

export type { TaskDto };
