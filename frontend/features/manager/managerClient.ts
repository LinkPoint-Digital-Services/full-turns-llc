import {api} from '@/features/lib/axios/instance';
import type {UpdateProfileRequest} from '@/features/manager/types/profile.types';
import { GetItemsResponse, GetServicesResponse, MsgResponse } from '@/features/shared/types/api.types';
import { Endpoint } from '@/features/lib/endpoints';

export const managerClient = {
  updateProfile: (payload: UpdateProfileRequest) =>
    api
      .patch<MsgResponse>(Endpoint.manager.updateProfile, payload)
      .then(res => res.data),

  getServices: (admin_id: string) =>
    api
      .get<GetServicesResponse>(Endpoint.manager.getServices, { params: { admin_id } })
      .then(res => res.data),

  getItems: (admin_id: string) =>
    api
      .get<GetItemsResponse>(Endpoint.manager.getItems, { params: { admin_id } })
      .then(res => res.data)
};
