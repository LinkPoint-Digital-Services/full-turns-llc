export interface OrderItem {
  id: string;
  serviceId: string;
  name: string;
  details?: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "Pending" | "Completed" | "Processing" | "Cancelled";

export interface OrderSummary {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemsCount: number;
  items?: {
    name: string;
    price: number;
    quantity: number;
    details?: string;
  }[];
}

