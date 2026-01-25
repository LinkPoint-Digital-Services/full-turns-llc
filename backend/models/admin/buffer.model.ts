import { Schema, model } from 'mongoose';

export const BufferSchema = new Schema({
  buffer_id: { type: String, required: true },
  manager_name: { type: String, required: true },
  buffer_price: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
