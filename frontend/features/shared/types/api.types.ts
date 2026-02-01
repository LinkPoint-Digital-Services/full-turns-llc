import {BufferItem} from '@/features/admin/types/buffer.types';
import {BlogItem} from '@/features/admin/types/blogs.types';
import {ServiceItem, ItemData} from '@/features/admin/types/services.types';

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

export interface GetBlogResponse {
  success: boolean;
  message: string;
  data: BlogItem[];
}

export interface GetServicesResponse {
  success: boolean;
  message: string;
  data: ServiceItem[];
}

export interface GetItemsResponse {
  success: boolean;
  message: string;
  data: ItemData[];
}
