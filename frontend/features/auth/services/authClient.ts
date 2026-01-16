import {api} from '@/features/lib/axios/instance';
import type {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  VerifyCodeRequest
} from '../types/auth.types';
import {User} from '../types/user.types';
import {MsgResponse} from '@/features/shared/types/api.types';

export const authClient = {
  register: (payload: RegisterRequest) =>
    api.post<MsgResponse>('/auth/register', payload).then(res => res.data),

  login: (payload: LoginRequest) =>
    api.post<User>('/auth/login', payload).then(res => res.data),

  verifyEmail: (payload: VerifyEmailRequest) =>
    api
      .post<MsgResponse>('/auth/forgot-password', payload)
      .then(res => res.data),
  verifyCode: (payload: VerifyCodeRequest) =>
    api
      .post<MsgResponse>('/auth/reset-password', payload)
      .then(res => res.data),

  me: () =>
    api
      .get<{message: string; user: User}>('/users/verify-me')
      .then(res => res.data),

  logout: () =>
    api.post<{message: string}>('/auth/logout').then(res => res.data)
};
