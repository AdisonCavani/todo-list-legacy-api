import type {
  CreateListRequest,
  CreateTaskRequest,
  UpdateListRequest,
  UpdateTaskRequest,
} from "@lib/types";

interface RequestOptions {
  headers?: HeadersInit;
}

export interface QueryOptions extends RequestOptions {
  queryParameters?: unknown;
}

export interface MutationOptions extends RequestOptions {
  body: unknown;
}

export interface CreateListOptions extends MutationOptions {
  body: CreateListRequest;
}

export interface UpdateListOptions extends MutationOptions {
  body: UpdateListRequest;
}

export interface CreateTaskOptions extends MutationOptions {
  body: CreateTaskRequest;
}

export interface UpdateTaskOptions extends MutationOptions {
  body: UpdateTaskRequest;
}
