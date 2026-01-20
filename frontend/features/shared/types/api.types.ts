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
