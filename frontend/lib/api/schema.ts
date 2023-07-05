import type { TaskType } from "@db/schema";
import type { CreateTaskOptions, UpdateTaskOptions } from "./requests";

export interface EndpointsSchema {
  "/tasks": {
    post: (options: CreateTaskOptions) => Promise<TaskType>;
    patch: (options: UpdateTaskOptions) => Promise<TaskType>;
  };
  "/tasks/{id}": {
    delete: () => Promise<void>;
  };
}
