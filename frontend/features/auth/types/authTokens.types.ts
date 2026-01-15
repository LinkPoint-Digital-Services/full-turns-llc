export interface AuthTokens {
  accessToken: string;
  refreshToken?: string; // optional, depends on backend
  expires_in?: number;   // optional, useful if backend sends expiry
  token_type?: string;   // e.g. "Bearer"
}
