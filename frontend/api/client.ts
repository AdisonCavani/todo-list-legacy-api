import { RestClient } from "@lib/http";
import type { PostDto } from "./dtos/PostDto";
import type { CreatePostReq } from "./req/CreatePostReq";
import type { GetPostReq } from "./req/GetPostReq";
import type { PaginatedReq } from "./req/PaginatedReq";
import type { HealthCheckRes } from "./res/HealthCheckRes";
import type { PaginatedRes } from "./res/PaginatedRes";
import { ApiRoutes } from "./routes";

const client = new RestClient(ApiRoutes.baseUrl);

export async function getHealth() {
  return await client.get<HealthCheckRes>(ApiRoutes.health);
}

export async function getPost(req: GetPostReq) {
  return await client.get<PostDto>(ApiRoutes.post.get, req);
}

export async function getAllPosts(req: PaginatedReq) {
  return await client.get<PaginatedRes<PostDto>>(ApiRoutes.post.getAll, req);
}

export async function createPost(req: CreatePostReq) {
  return await client.post<PostDto>(ApiRoutes.post.create, req);
}
