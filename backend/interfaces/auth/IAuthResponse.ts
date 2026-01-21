import {IAuthUser} from '../auth/IAuthUser';

export interface IAuthResponse {
  user: IAuthUser;
  accessToken: string;
}

export interface IUserEmailParams {
  email_address: string;
}

export interface IResetPasswordParams {
  email_address: string;
  type: string;
}
