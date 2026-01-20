import {User} from './user.types';
import {AuthTokens} from './authTokens.types';

export interface LoginRequest {
  email_address: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email_address: string;
  contact_no: string;
  password: string;
  role: 'manager' | 'admin' | 'superadmin';
  account_type?: 'solo' | 'company';
  company_name?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface VerifyEmailRequest {
  email_address: string;
}

export interface VerifyCodeRequest {
  email_address: string;
  verificationCode: string;
}
