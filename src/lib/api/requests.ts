import type { CreateTaskRequest, UpdateTaskRequest } from "@lib/types";

interface RequestOptions {
  headers?: HeadersInit;
}

export interface QueryOptions extends RequestOptions {
  queryParameters?: unknown;
}

export interface MutationOptions extends RequestOptions {
  body: unknown;
}

export interface CreateTaskOptions extends MutationOptions {
  body: CreateTaskRequest;
}

export interface UpdateTaskOptions extends MutationOptions {
  body: UpdateTaskRequest;
}
