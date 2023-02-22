import { z } from "zod";
import { TaskDtoSchema } from "./dtos/TaskDto";
import { GetTaskReqSchema } from "./req/GetTaskReq";
import { HealthCheckResSchema } from "./res/HealthCheckRes";
import { CreateTaskReqSchema } from "./req/CreateTaskReq";
import { UpdateTaskReqSchema } from "./req/UpdateTaskReq";

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
  const queryUrl = request
    ? `${baseUrl + endpoint}?${appendParams(request)}`
    : baseUrl + endpoint;

  const res = await fetchApi(
    "GET",
    queryUrl,
    undefined,
    getEndpoint[endpoint],
    jwtToken
  );
  getEndpoint[endpoint].response.parse(res);

  return res;
}

export async function post<Endpoint extends keyof typeof postEndpoint>(
  endpoint: Endpoint,
  request: z.infer<(typeof postEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<z.infer<(typeof postEndpoint)[Endpoint]["response"]>> {
  const queryUrl = baseUrl + endpoint;

  const res = await fetchApi(
    "POST",
    queryUrl,
    request,
    postEndpoint[endpoint],
    jwtToken
  );
  postEndpoint[endpoint].response.parse(res);

  return res;
}

export async function patch<Endpoint extends keyof typeof patchEndpoint>(
  endpoint: Endpoint,
  request: z.infer<(typeof patchEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<z.infer<(typeof patchEndpoint)[Endpoint]["response"]>> {
  const queryUrl = baseUrl + endpoint;

  const res = await fetchApi(
    "PATCH",
    queryUrl,
    request,
    patchEndpoint[endpoint],
    jwtToken
  );
  patchEndpoint[endpoint].response.parse(res);

  return res;
}

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function fetchApi(
  method: Method,
  queryUrl: string,
  request: any,
  object: any,
  jwtToken: string | undefined
) {
  if (object.auth && !jwtToken) throw new Error("You need to pass jwt token");

  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (jwtToken)
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };

  let body: BodyInit | null = null;

  if (method !== "GET") body = JSON.stringify(request);

  const res = await fetch(queryUrl, {
    method: method,
    headers: headers,
    body: body,
  });

  const json = await res.json();

  if (!res.ok) throw new Error("Failed to fetch data");

  // if (res.status === 204) return;

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
