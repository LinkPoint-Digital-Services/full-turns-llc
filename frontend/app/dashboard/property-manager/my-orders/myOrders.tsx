"use client";
import React, {useEffect, useState} from "react";
import {ChevronRight, Package, Calendar} from "lucide-react";
import type {
  OrderSummary,
  BackendOrder,
  BackendOrderItem,
} from "@/features/manager/types/order.types";
import {orderClient} from "@/features/manager/orderClient";
import OrderDetailsDialog from "@/features/manager/components/OrderDetailsDialog";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Processing":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderClient.getMyOrders();
        // Map backend response to local OrderSummary format
        const mappedOrders: OrderSummary[] = response.data.map(
          (order: BackendOrder) => ({
            id: order.orderId,
            date: new Date(order.created_at).toLocaleDateString(),
            status: order.status,
            total: order.totalAmount,
            itemsCount: order.items.length,
            images: order.images,
            managerName: order.managerName,
            managerEmail: order.managerEmail,
            notes: order.notes,
            googleDriveLink: order.googleDriveLink,
            items: order.items.map((item: BackendOrderItem) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              details: item.details,
            })),
          }),
        );
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const hasOrders = orders.length > 0;

  if (loading) {
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 py-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 md:sticky top-50 p-2 bg-white">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            My Orders
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            View and track your recent orders.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3 md:space-y-4 pb-20 p-2">
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            {/* CLICKABLE CARD */}
            <div 
              onClick={() => setSelectedOrder(order)}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-start gap-4 mb-4 md:mb-0 w-full md:w-auto">
                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
                  <Package className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle */}
              <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto text-sm text-gray-600">
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{order.date}</span>
                </div>
                <div className="flex items-center gap-2 min-w-[80px]">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>{order.itemsCount} Items</span>
                </div>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <span className="font-medium text-gray-900">
                    ${order.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center pl-4">
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {selectedOrder && (
        <OrderDetailsDialog
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}

      {/* Empty State */}
      {!hasOrders && (
        <div className="text-center py-20 text-gray-500">
          <p>No orders found.</p>
        </div>
      )}
    </div>
  );
}
