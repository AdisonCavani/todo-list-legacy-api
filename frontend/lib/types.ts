import type { TaskType } from "@db/schema";

export type TaskPriorityEnum = "P1" | "P2" | "P3" | "P4";

export interface TaskRenderType extends TaskType {
  renderId?: string;
}

export type CreateTaskRequest = {
  title: string;
  dueDate?: Date | null;
  priority: "P1" | "P2" | "P3" | "P4";
};

export interface UpdateTaskRequest extends CreateTaskRequest {
  id: string;
  description?: string | null;
  isCompleted?: boolean;
  isImportant?: boolean;
}
