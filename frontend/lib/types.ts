import type { TaskDto } from "@api/dtos/TaskDto";

export interface TaskType extends TaskDto {
  renderId?: string;
}
