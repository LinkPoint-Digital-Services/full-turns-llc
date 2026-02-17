export interface OrderItem {
  id: string;
  serviceId: string;
  name: string;
  details?: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "Pending" | "Completed" | "Processing" | "Cancelled";

export interface CreateOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

export interface CreateOrderRequest {
  items: CreateOrderItem[];
  totalAmount: number;
}

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
  images?: string[];
  managerName?:string;
  managerEmail?: string;
}

export interface BackendOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

export interface BackendOrder {
  _id: string;
  orderId: string;
  created_at: string;
  status: OrderStatus;
  totalAmount: number;
  items: BackendOrderItem[];
  images?: string[];
  managerId?: string;
  managerName?: string;
  managerEmail?: string;
}

