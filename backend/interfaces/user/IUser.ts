import {Document, Types} from 'mongoose';
import {IBuffers} from '../admin/IBuffers';
import {IBlogs} from '../admin/IBlogs';
import {IServices} from '../admin/IServices';

export type UserRole = 'manager' | 'admin' | 'superadmin';

export interface IUser {
  first_name: string;
  last_name: string;
  account_type?: 'solo' | 'company';
  company_name?: string;
  email_address: string;
  contact_no: string;
  password: string;
  role: UserRole;
  created_at?: Date;
  updated_at?: Date;
  verificationCode?: string;

  // Admin
  buffers?: Types.ObjectId[] | IBuffers[];
  blogs?: Types.ObjectId[] | IBlogs[];
  services?: Types.ObjectId[] | IServices[];
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
