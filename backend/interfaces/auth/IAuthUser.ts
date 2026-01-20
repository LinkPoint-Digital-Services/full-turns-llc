import { Types } from 'mongoose';

export interface IAuthUser {
  _id: Types.ObjectId | string;
  email_address: string;
  first_name: string;
  last_name: string;
  role: 'manager' | 'admin' | 'superadmin';
  account_type?: 'solo' | 'company';   
  company_name?: string;            
}

export interface LogindData {
  email_address: string;
  password: string;
}