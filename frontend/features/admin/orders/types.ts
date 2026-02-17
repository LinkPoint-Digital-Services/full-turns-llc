export type OrderStatus = "Pending" | "Completed" | "Processing" | "Cancelled";

export interface OrderSummary {
  id: string;
  dbId?: string;
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
  managerName?: string;
  managerEmail?: string;
}
