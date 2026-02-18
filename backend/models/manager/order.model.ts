import { Schema, model } from 'mongoose';
import { IOrder, IOrderItem } from '../../interfaces/manager/IOrder';

const OrderItemSchema = new Schema<IOrderItem>({
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  details: { type: String }
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    managerId: { type: String, required: true, ref: 'managers' },
    managerName: { type: String },
    managerEmail: { type: String },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    images: [{ type: String }],
    notes: { type: String },
    googleDriveLink: { type: String }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const OrderModel = model<IOrder>('orders', OrderSchema);
