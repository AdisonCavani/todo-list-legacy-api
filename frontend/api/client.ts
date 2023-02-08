import { RestClient } from "@lib/http";
import { cache } from "react";
import type { TaskDto } from "./dtos/TaskDto";
import type { CreateTaskReq } from "./req/CreateTaskReq";
import type { GetTaskReq } from "./req/GetTaskReq";
import type { PaginatedReq } from "./req/PaginatedReq";
import type { UpdateTaskReq } from "./req/UpdateTaskReq";
import type { HealthCheckRes } from "./res/HealthCheckRes";
import type { PaginatedRes } from "./res/PaginatedRes";
import { ApiRoutes } from "./routes";

const client = new RestClient(ApiRoutes.baseUrl);

export const getHealth = cache(async () => {
  return await client.get<HealthCheckRes>(ApiRoutes.health);
});

export const getTask = cache(async (req: GetTaskReq) => {
  return await client.get<TaskDto>(ApiRoutes.task.get, req);
});

export const listTasks = cache(async (req: PaginatedReq) => {
  return await client.get<PaginatedRes<TaskDto>>(ApiRoutes.task.list, req);
});

export async function createTask(req: CreateTaskReq) {
  return await client.post<TaskDto>(ApiRoutes.task.create, req);
}

export async function updateTask(req: UpdateTaskReq) {
  return await client.patch<TaskDto>(ApiRoutes.task.update, req);
}
