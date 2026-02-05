export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

export interface IOrderItem {
  itemId: string; // ID of the item from the catalog
  name: string;
  price: number; // Total price for this line item
  quantity: number;
  details?: string;
}

export interface IOrder {
  _id?: string;
  orderId: string; // Readable ID like ORD-123...
  managerId: string; // Reference to the user who placed it
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
