import { z } from "zod";
import { TaskDtoSchema } from "./dtos/taskDto";
import { GetTaskReqSchema } from "./req/getTaskReq";
import { HealthCheckResSchema } from "./res/healthCheckRes";
import { CreateTaskReqSchema } from "./req/createTaskReq";
import { UpdateTaskReqSchema } from "./req/updateTaskReq";

const baseUrl = "https://localhost:7087/api";

const getEndpoint = {
  "/health": {
    auth: false,
    request: z.undefined(),
    response: HealthCheckResSchema,
  },
  "/task/get": {
    auth: true,
    request: GetTaskReqSchema,
    response: TaskDtoSchema,
  },
};

const postEndpoint = {
  "/task/create": {
    auth: true,
    request: CreateTaskReqSchema,
    response: TaskDtoSchema,
  },
};

const patchEndpoint = {
  "/task/update": {
    auth: true,
    request: UpdateTaskReqSchema,
    response: TaskDtoSchema,
  },
};

export async function get<Endpoint extends keyof typeof getEndpoint>(
  endpoint: Endpoint,
  request?: z.infer<(typeof getEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<z.infer<(typeof getEndpoint)[Endpoint]["response"]>> {
  if (getEndpoint[endpoint].auth && !jwtToken)
    throw new Error("You need to pass jwt token");

  const queryUrl = request
    ? `${baseUrl + endpoint}?${appendParams(request)}`
    : baseUrl + endpoint;

  const res = await fetch(queryUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();

  if (!res.ok) throw new Error("Failed to fetch data");

  // if (res.status === 204) return;

  getEndpoint[endpoint]["response"].parse(json);
  return json;
}

export async function post<Endpoint extends keyof typeof postEndpoint>(
  endpoint: Endpoint,
  request: z.infer<(typeof postEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<z.infer<(typeof postEndpoint)[Endpoint]["response"]>> {
  if (postEndpoint[endpoint].auth && !jwtToken)
    throw new Error("You need to pass jwt token");

  const queryUrl = baseUrl + endpoint;

  const res = await fetch(queryUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const json = await res.json();

  if (!res.ok) throw new Error("Failed to fetch data");

  postEndpoint[endpoint]["response"].parse(json);
  return json;
}

export async function patch<Endpoint extends keyof typeof patchEndpoint>(
  endpoint: Endpoint,
  request: z.infer<(typeof patchEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<z.infer<(typeof patchEndpoint)[Endpoint]["response"]>> {
  if (patchEndpoint[endpoint].auth && !jwtToken)
    throw new Error("You need to pass jwt token");

  const queryUrl = baseUrl + endpoint;

  const res = await fetch(queryUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const json = await res.json();

  if (!res.ok) throw new Error("Failed to fetch data");

  patchEndpoint[endpoint]["response"].parse(json);
  return json;
}

function appendParams(obj: any): URLSearchParams {
  const params = new URLSearchParams();

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}
