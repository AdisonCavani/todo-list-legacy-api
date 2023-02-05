import type { BaseDto } from "./BaseDto";

interface TaskDto extends BaseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
}

export type { TaskDto };
