import type { TaskDto } from "./dtos/TaskDto";
import type { CreateTaskReq } from "./req/CreateTaskReq";
import type { PaginatedReq } from "./req/PaginatedReq";
import type { UpdateTaskReq } from "./req/UpdateTaskReq";
import type { HealthCheckRes } from "./res/HealthCheckRes";
import type { PaginatedRes } from "./res/PaginatedRes";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const getEndpoint = {
  "/health": {
    auth: false,
    request: undefined,
    response: {} as HealthCheckRes,
  },
  "/tasks/{id}": {
    auth: true,
    request: {} as string,
    response: {} as TaskDto,
  },
  "/tasks": {
    auth: true,
    request: {} as PaginatedReq,
    response: {} as PaginatedRes<TaskDto>,
  },
};

const postEndpoint = {
  "/tasks": {
    auth: true,
    request: {} as CreateTaskReq,
    response: {} as TaskDto,
  },
};

const patchEndpoint = {
  "/tasks": {
    auth: true,
    request: {} as UpdateTaskReq,
    response: {} as TaskDto,
  },
};

const deleteEndpoint = {
  "/tasks/{id}": {
    auth: true,
    request: {} as string,
    response: undefined,
  },
};

export async function httpGet<Endpoint extends keyof typeof getEndpoint>(
  endpoint: Endpoint,
  request?: (typeof getEndpoint)[Endpoint]["request"],
  jwtToken?: string
): Promise<(typeof getEndpoint)[Endpoint]["response"] | undefined> {
  let queryUrl = "";

  // Path params
  if (request && isPrimitive(request))
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
    jwtToken
  );

  return res;
}

export async function httpPost<Endpoint extends keyof typeof postEndpoint>(
  endpoint: Endpoint,
  request: (typeof postEndpoint)[Endpoint]["request"],
  jwtToken?: string
): Promise<(typeof postEndpoint)[Endpoint]["response"]> {
  const queryUrl = baseUrl + endpoint;

  const res = await fetchApi(
    "POST",
    queryUrl,
    request,
    postEndpoint[endpoint],
    jwtToken
  );

  return res;
}

export async function httpPatch<Endpoint extends keyof typeof patchEndpoint>(
  endpoint: Endpoint,
  request: (typeof patchEndpoint)[Endpoint]["request"],
  jwtToken?: string
): Promise<(typeof patchEndpoint)[Endpoint]["response"]> {
  const queryUrl = baseUrl + endpoint;

  const res = await fetchApi(
    "PATCH",
    queryUrl,
    request,
    patchEndpoint[endpoint],
    jwtToken
  );

  return res;
}

export async function httpDelete<Endpoint extends keyof typeof deleteEndpoint>(
  endpoint: Endpoint,
  request: (typeof deleteEndpoint)[Endpoint]["request"],
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
    jwtToken
  );

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

  if (!res.ok) {
    // If JWT expired & is client
    if (res.status === 401 && typeof window !== "undefined") {
      const { signOut } = await import("next-auth/react");

      const params = new URLSearchParams();
      params.append("sessionExpired", "true");

      signOut({
        callbackUrl: `/auth?${params}`,
      });

      // TODO: find a better way
      // This fixes exception when data is undefined, because router hasn't finished redirecting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return;
    }

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

  return await res.json();
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
