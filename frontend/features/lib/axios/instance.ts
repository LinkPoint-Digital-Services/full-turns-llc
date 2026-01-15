import axios from 'axios';
import type {AxiosError} from 'axios';

type ErrorResponse = {
  message?: string;
  code?: string;
  errors?: Record<string, string>;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000
});

api.interceptors.response.use(
  res => res,
  (error: AxiosError<ErrorResponse>) => {
    const message =
      error.response?.data?.message || 'Unexpected error. Please try again.';
    return Promise.reject({message, status: error.response?.status});
  }
);
