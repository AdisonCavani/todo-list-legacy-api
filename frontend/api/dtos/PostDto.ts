import type { BaseDto } from "./BaseDto";

interface PostDto extends BaseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  language: number;
  theme: number;
}

export type { PostDto };
