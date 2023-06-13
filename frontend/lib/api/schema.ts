import { TaskDto } from "./dtos/TaskDto";
import {
  AuthQueryOptions,
  CreateTaskOptions,
  ListTasksOptions,
  UpdateTaskOptions,
} from "./requests";
import { HealthCheckRes } from "./res/HealthCheckRes";
import { PaginatedRes } from "./res/PaginatedRes";

export interface EndpointsSchema {
  "/health": {
    get: () => Promise<HealthCheckRes>;
  };
  "/tasks": {
    get: (options: ListTasksOptions) => Promise<PaginatedRes<TaskDto>>;
    post: (options: CreateTaskOptions) => Promise<TaskDto>;
    patch: (options: UpdateTaskOptions) => Promise<TaskDto>;
  };
  "/tasks/{id}": {
    get: (options: AuthQueryOptions) => Promise<TaskDto>;
    delete: (options: AuthQueryOptions) => Promise<void>;
  };
}
