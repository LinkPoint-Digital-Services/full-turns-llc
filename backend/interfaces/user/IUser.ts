import { Document, Types } from 'mongoose';

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
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}