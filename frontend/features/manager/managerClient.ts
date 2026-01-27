import {api} from '@/features/lib/axios/instance';
import type {UpdateProfileRequest} from '@/features/manager/types/profile.types';
import {MsgResponse} from '@/features/shared/types/api.types';
import {Endpoint} from '@/features/lib/endpoints';

export const managerClient = {
  updateProfile: (payload: UpdateProfileRequest) =>
    api
      .patch<MsgResponse>(Endpoint.manager.updateProfile, payload)
      .then(res => res.data)
};
