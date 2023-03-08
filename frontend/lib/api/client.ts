import { TaskDtoSchema } from "./dtos/TaskDto";
import { CreateTaskReqSchema } from "./req/CreateTaskReq";
import { PaginatedReqSchema } from "./req/PaginatedReq";
import { UpdateTaskReqSchema } from "./req/UpdateTaskReq";
import { HealthCheckResSchema } from "./res/HealthCheckRes";
import { PaginatedResTaskDtoSchema } from "./res/PaginatedRes";
import { z, ZodObject } from "zod";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getEndpoint = {
  "/health": {
    auth: false,
    request: z.undefined(),
    response: HealthCheckResSchema,
  },
  "/tasks/{id}": {
    auth: true,
    request: z.string(),
    response: TaskDtoSchema,
  },
  "/tasks": {
    auth: true,
    request: PaginatedReqSchema,
    response: PaginatedResTaskDtoSchema,
  },
};

const postEndpoint = {
  "/tasks": {
    auth: true,
    request: CreateTaskReqSchema,
    response: TaskDtoSchema,
  },
};

const patchEndpoint = {
  "/tasks": {
    auth: true,
    request: UpdateTaskReqSchema,
    response: TaskDtoSchema,
  },
};

const deleteEndpoint = {
  "/tasks/{id}": {
    auth: true,
    request: z.string(),
    response: undefined,
  },
};

export async function httpGet<Endpoint extends keyof typeof getEndpoint>(
  endpoint: Endpoint,
  request?: z.infer<(typeof getEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<z.infer<(typeof getEndpoint)[Endpoint]["response"]> | undefined> {
  let queryUrl = "";

  // Path params
  if (isPrimitive(request))
    queryUrl = baseUrl + endpoint.substring(0, endpoint.indexOf("{")) + request;
  // Query params
  else
    queryUrl = request
      ? `${baseUrl + endpoint}?${appendParams(request)}`
      : baseUrl + endpoint;

  const res = await fetchApi(
    "GET",
    queryUrl,
    undefined,
    getEndpoint[endpoint],
    jwtToken,
    getEndpoint[endpoint].response
  );

  return res;
}

export async function httpPost<Endpoint extends keyof typeof postEndpoint>(
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
    jwtToken,
    postEndpoint[endpoint].response
  );

  return res;
}

export async function httpPatch<Endpoint extends keyof typeof patchEndpoint>(
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
    jwtToken,
    patchEndpoint[endpoint].response
  );

  return res;
}

export async function httpDelete<Endpoint extends keyof typeof deleteEndpoint>(
  endpoint: Endpoint,
  request: z.infer<(typeof deleteEndpoint)[Endpoint]["request"]>,
  jwtToken?: string
): Promise<undefined> {
  let queryUrl = "";

  // Path params
  if (isPrimitive(request))
    queryUrl = baseUrl + endpoint.substring(0, endpoint.indexOf("{")) + request;
  // Query params
  else
    queryUrl = request
      ? `${baseUrl + endpoint}?${appendParams(request)}`
      : baseUrl + endpoint;

  const res = await fetchApi(
    "DELETE",
    queryUrl,
    undefined,
    deleteEndpoint[endpoint],
    jwtToken,
    deleteEndpoint[endpoint].response
  );

  return res;
}

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function fetchApi(
  method: Method,
  queryUrl: string,
  request: any,
  object: any,
  jwtToken: string | undefined,
  schema: ZodObject<any> | undefined
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

  if (!res.ok) {
    const text = await res.text();

    const errorObj = {
      message: "Fetch failed",
      queryUrl: queryUrl,
      method: method,
      statusCode: res.status,
      statusText: res.statusText,
      ...(text.length > 0 && { reason: text }),
    };

    throw new Error(JSON.stringify(errorObj, null, 2));
  }

  if (res.status === 204) return;

  const json = await res.json();

  if (schema) schema.parse(json);

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

function isPrimitive(object: any) {
  if (object === Object(object)) return false;

  return true;
}
