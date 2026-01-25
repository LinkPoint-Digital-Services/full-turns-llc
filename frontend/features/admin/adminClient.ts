import {api} from '@/features/lib/axios/instance';
import type {
  AddBufferRequest,
  DeleteBufferRequest
} from '@/features/admin/types/buffer.types';
import type {
  AddBlogRequest,
  UpdateBlogRequest,
  DeleteBlogRequest
} from '@/features/admin/types/blogs.types';
import {GetBlogResponse} from '@/features/shared/types/api.types';
import {
  MsgResponse,
  GetBufferResponse
} from '@/features/shared/types/api.types';
import {Endpoint} from '@/features/lib/endpoints';

export const adminClient = {
  // Buffer management endpoints
  addBuffer: (payload: AddBufferRequest) =>
    api
      .post<MsgResponse>(Endpoint.admin.addBuffer, payload)
      .then(res => res.data),

  getBuffer: (admin_id: string) =>
    api
      .get<GetBufferResponse>(Endpoint.admin.getBuffer, {params: {admin_id}})
      .then(res => res.data),

  deleteBuffer: (payload: DeleteBufferRequest) =>
    api
      .delete<MsgResponse>(Endpoint.admin.deleteBuffer, {data: payload})
      .then(res => res.data),

  // Blog management endpoints
  addBlog: (payload: AddBlogRequest | FormData) => {
    if (payload instanceof FormData) {
      return api
        .post<MsgResponse>(Endpoint.admin.addBlog, payload, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => res.data);
    } else {
      return api
        .post<MsgResponse>(Endpoint.admin.addBlog, payload)
        .then(res => res.data);
    }
  },

  updateBlog: (payload: UpdateBlogRequest) =>
    api
      .patch<MsgResponse>(Endpoint.admin.updateBlog, payload)
      .then(res => res.data),

  deleteBlog: (payload: DeleteBlogRequest) =>
    api
      .delete<MsgResponse>(Endpoint.admin.deleteBlog, {data: payload})
      .then(res => res.data),

  getBlog: (admin_id: string) =>
    api
      .get<GetBlogResponse>(Endpoint.admin.getBlog, {params: {admin_id}})
      .then(res => res.data)
};
