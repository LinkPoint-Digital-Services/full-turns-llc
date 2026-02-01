import { Schema, model } from 'mongoose';
import { IItem } from '../../interfaces/admin/IItem';

const AddOnSchema = new Schema({
  addOnsId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

export const ItemSchema = new Schema<IItem>(
  {
    _id: { type: String, required: true }, // UUID from frontend (itemId)
    admin_id: { type: String, required: true, ref: 'admins' },
    serviceId: { type: String, required: true, ref: 'services' },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    basePrice: { type: Number, required: true },
    measurement: { type: String, required: true },
    allowCustomDetails: { type: Boolean, default: false },
    notes: { type: String },
    addOns: [AddOnSchema]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const ItemModel = model<IItem>('items', ItemSchema);
