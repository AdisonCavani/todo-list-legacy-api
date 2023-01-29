import { RestClient } from "@lib/http";
import type { PostDto } from "./dtos/PostDto";
import type { GetPostReq } from "./req/GetPostReq";
import type { HealthCheckRes } from "./res/HealthCheckRes";

const client = new RestClient("https://localhost:7087/api");

export async function getHealth() {
  return await client.get<HealthCheckRes>("/health");
}

export async function getPost(req: GetPostReq) {
  return await client.get<PostDto>("/post/get", req);
}
