import {IAuthUser} from '../auth/IAuthUser';

export interface IAuthResponse {
  user: IAuthUser;
  accessToken: string;
}

export interface IUserEmailParams {
  type: string;
  email_address: string;
}
