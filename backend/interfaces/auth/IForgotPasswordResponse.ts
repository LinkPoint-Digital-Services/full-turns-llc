import {IAuthUser} from '../auth/IAuthUser';

export interface IForgotResponse {
  user: IAuthUser;
  success?: boolean;
  message: string;
}
