"use client";

import {OrdersTable, OrderSummary} from "@/features/admin/orders/OrdersTable";
import React, { useEffect, useState } from "react";
import { orderClient } from "@/features/manager/orderClient";
import { BackendOrder, BackendOrderItem } from "@/features/manager/types/order.types";
import {toast} from "sonner";

export default function ViewOrders() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderClient.getAllOrders();
        const mappedOrders: OrderSummary[] = response.data.map((order: BackendOrder) => ({
          id: order.orderId,
          dbId: order._id, // Keep the DB ID for updates
          date: new Date(order.created_at).toISOString(),
          status: order.status,
          total: order.totalAmount,
          itemsCount: order.items.length,
          managerName: order.managerName || "Unknown",
          managerEmail: order.managerEmail,
          images: order.images,
          notes: order.notes,
          googleDriveLink: order.googleDriveLink,
          items: order.items.map((item: BackendOrderItem) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            details: item.details
          }))
        }));
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Failed to fetch all orders:", error);
        toast.error("Failed to load orders. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
     return <div className="p-10 text-center flex flex-col items-center justify-center min-h-100">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
       <p className="text-gray-500">Loading orders...</p>
     </div>;
  }

  return (
    <main className="mt-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Property Manager Orders</h1>
          <p className="text-muted-foreground">
            Track orders placed by property managers and see details like
            status, items count, total amount, and manager name.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <OrdersTable orders={orders} />
      </div>
    </main>
  );
}
