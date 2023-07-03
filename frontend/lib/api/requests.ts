import type { CreateTaskReq } from "./req/CreateTaskReq";
import type { PaginatedReq } from "./req/PaginatedReq";
import type { UpdateTaskReq } from "./req/UpdateTaskReq";

interface RequestOptions {
  headers?: HeadersInit;
  jwtToken?: string;
}

export interface QueryOptions extends RequestOptions {
  queryParameters?: unknown;
}

export interface AuthQueryOptions extends QueryOptions {
  jwtToken: string;
}

export interface MutationOptions extends RequestOptions {
  body: unknown;
}

export interface AuthMutationOptions extends MutationOptions {
  jwtToken: string;
}

export interface ListTasksOptions extends AuthQueryOptions {
  queryParameters: PaginatedReq;
}

export interface CreateTaskOptions extends AuthMutationOptions {
  body: CreateTaskReq;
}

export interface UpdateTaskOptions extends AuthMutationOptions {
  body: UpdateTaskReq;
}
