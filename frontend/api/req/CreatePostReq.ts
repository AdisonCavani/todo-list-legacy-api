import type { BaseReq } from "./BaseReq";

interface CreatePostReq extends BaseReq {
  code: string;
  language: number;
  theme: number;
}

export type { CreatePostReq };
