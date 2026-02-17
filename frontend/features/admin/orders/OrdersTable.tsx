"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { OrderSummary } from "./types";
import { useEffect, useState } from "react";
import OrderDetailsDialog from "@/features/manager/components/OrderDetailsDialog";

interface OrdersTableProps {
  orders: OrderSummary[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const handleOpenReceipt = (event: Event) => {
      const customEvent = event as CustomEvent<OrderSummary>;
      setSelectedOrder(customEvent.detail);
    };

    window.addEventListener('openOrderReceipt', handleOpenReceipt);
    return () => {
      window.removeEventListener('openOrderReceipt', handleOpenReceipt);
    };
  }, []);

  return (
    <>
      <div className="w-full">
        <DataTable columns={columns} data={orders} searchKey="managerName" />
      </div>
      
      {selectedOrder && (
        <OrderDetailsDialog
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}
    </>
  );
}

export type { OrderSummary };
