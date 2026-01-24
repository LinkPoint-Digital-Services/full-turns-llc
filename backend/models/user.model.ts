import {Schema, model} from 'mongoose';
import {IUserDocument} from '../interfaces/user/IUser';
import {BufferSchema} from './admin/buffer.model';

// Base schema shared by all roles
const BaseUserSchema = new Schema<IUserDocument>(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email_address: {type: String, required: true, unique: true},
    contact_no: {type: String, required: true},
    password: {type: String, required: true, select: false},
    role: {
      type: String,
      enum: ['manager', 'admin', 'superadmin'],
      required: true
    },
    account_type: {type: String, enum: ['solo', 'company']},
    company_name: {type: String},
    buffers: [BufferSchema],
    blogs: [{type: Schema.Types.ObjectId, ref: 'blogs'}],
    services: [{type: Schema.Types.ObjectId, ref: 'services'}],
    verificationCode: {type: String}
  },
  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
);

// Seperated collections
export const ManagerModel = model<IUserDocument>('managers', BaseUserSchema);
export const AdminModel = model<IUserDocument>('admins', BaseUserSchema);
export const SuperAdminModel = model<IUserDocument>(
  'superadmins',
  BaseUserSchema
);
