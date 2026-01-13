import {Types} from 'mongoose';

export interface IAuthUser {
  _id?: Types.ObjectId | string;
  email: string;
  username: string;
}

export interface LogindData {
  email: string;
  password: string;
}
