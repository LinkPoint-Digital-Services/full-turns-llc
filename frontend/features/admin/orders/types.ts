export type OrderStatus = "Pending" | "Completed" | "Processing" | "Cancelled";

export interface OrderSummary {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemsCount: number;
  items?: string[];
  property?: string;
}
