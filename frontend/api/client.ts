import { RestClient } from "@lib/http";
import type { TaskDto } from "./dtos/taskDto";
import type { PaginatedReq } from "./req/paginatedReq";
import type { PaginatedRes } from "./res/paginatedRes";
import { ApiRoutes } from "./routes";

const client = new RestClient(ApiRoutes.baseUrl);

export const listTasks = async (req: PaginatedReq, jwtToken: string) => {
  return await client.get<PaginatedRes<TaskDto>>(
    ApiRoutes.task.list,
    req,
    jwtToken
  );
};
