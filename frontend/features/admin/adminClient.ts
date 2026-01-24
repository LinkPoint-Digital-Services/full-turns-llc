import {api} from '@/features/lib/axios/instance';
import type {
  AddBufferRequest,
  DeleteBufferRequest,
} from '@/features/admin/types/buffer.types';
import {
  MsgResponse,
  GetBufferResponse
} from '@/features/shared/types/api.types';
import {Endpoint} from '@/features/lib/endpoints';

export const adminClient = {
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
      .then(res => res.data)
};
