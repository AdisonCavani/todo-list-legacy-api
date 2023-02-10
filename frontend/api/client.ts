import { RestClient } from "@lib/http";
import type { TaskDto } from "./dtos/taskDto";
import type { CreateTaskReq } from "./req/createTaskReq";
import type { GetTaskReq } from "./req/getTaskReq";
import type { PaginatedReq } from "./req/paginatedReq";
import type { UpdateTaskReq } from "./req/updateTaskReq";
import type { HealthCheckRes } from "./res/healthCheckRes";
import type { PaginatedRes } from "./res/paginatedRes";
import { ApiRoutes } from "./routes";

const client = new RestClient(ApiRoutes.baseUrl);

export const getHealth = async () => {
  return await client.get<HealthCheckRes>(ApiRoutes.health);
};

export const getTask = async (req: GetTaskReq) => {
  return await client.get<TaskDto>(ApiRoutes.task.get, req);
};

export const listTasks = async (req: PaginatedReq) => {
  return await client.get<PaginatedRes<TaskDto>>(ApiRoutes.task.list, req);
};

export async function createTask(req: CreateTaskReq) {
  return await client.post<TaskDto>(ApiRoutes.task.create, req);
}

export async function updateTask(req: UpdateTaskReq) {
  return await client.patch<TaskDto>(ApiRoutes.task.update, req);
}
