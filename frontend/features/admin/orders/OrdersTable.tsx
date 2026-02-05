"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { OrderSummary } from "./types";

interface OrdersTableProps {
  orders: OrderSummary[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={orders} searchKey="managerName" />
    </div>
  );
}

export type { OrderSummary };
