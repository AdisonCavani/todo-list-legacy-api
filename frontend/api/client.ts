import { RestClient } from "@lib/http";
import type { PostDto } from "./dtos/PostDto";
import type { CreatePostReq } from "./req/CreatePostReq";
import type { GetPostReq } from "./req/GetPostReq";
import type { HealthCheckRes } from "./res/HealthCheckRes";

const client = new RestClient("https://localhost:7087/api");

export async function getHealth() {
  return await client.get<HealthCheckRes>("/health");
}

export async function getPost(req: GetPostReq) {
  return await client.get<PostDto>("/post/get", req);
}

export async function createPost(req: CreatePostReq) {
  return await client.post<PostDto>("/post/create", req);
}
