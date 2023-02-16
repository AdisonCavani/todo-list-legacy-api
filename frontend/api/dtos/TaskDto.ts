type TaskDto = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  isCompleted: boolean;
  isImportant: boolean;
};

export type { TaskDto };
