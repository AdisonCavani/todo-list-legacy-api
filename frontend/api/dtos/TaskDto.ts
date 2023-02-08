type TaskDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  isCompleted: boolean;
};

export type { TaskDto };
