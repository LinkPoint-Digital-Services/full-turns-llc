import { BufferItem } from "@/features/admin/types/buffer.types";

export interface AuthTokens {
  accessToken: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: Error;
}

export interface MsgResponse {
  message: string;
}

export interface GetBufferResponse {
  success: boolean;
  message: string;
  data: BufferItem[];
}
