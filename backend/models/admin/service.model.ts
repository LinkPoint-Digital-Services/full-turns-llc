import { Schema, model } from 'mongoose';
import { IService } from '../../interfaces/admin/IService';

export const ServiceSchema = new Schema<IService>(
  {
    _id: { type: String, required: true }, // UUID from frontend
    admin_id: { type: String, required: true, ref: 'admins' },
    serviceName: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

ServiceSchema.index({ admin_id: 1 });

export const ServiceModel = model<IService>('services', ServiceSchema);
