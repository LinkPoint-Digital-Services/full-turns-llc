"use client";

import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Search, ChevronRight, Package, Calendar} from "lucide-react";
import type {
  OrderSummary,
  BackendOrder,
  BackendOrderItem,
} from "@/features/manager/types/order.types";
import {orderClient} from "@/features/manager/orderClient";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

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
          <Dialog key={order.id}>
            {/* CLICKABLE CARD */}
            <DialogTrigger asChild>
              <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer">
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
            </DialogTrigger>

            {/* MODAL */}
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Order {order.id}</DialogTitle>
                <DialogDescription>
                  Order summary and item breakdown.
                </DialogDescription>
              </DialogHeader>

              {/* ITEMS */}
              <div className="space-y-3 max-h-[400px] overflow-auto pr-1">
                {!order.items || order.items.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No items available for this order.
                  </p>
                ) : (
                  order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <span className="font-bold text-gray-900">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Quantity: {item.quantity}</p>
                        {item.details && (
                          <pre className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-2 whitespace-pre-wrap font-sans">
                            {item.details}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* IMAGES */}
              {order.images && order.images.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Order Images</h4>
                  <div className="flex flex-wrap gap-2 pb-2">
                    {order.images.map((img, i) => (
                      <a 
                        key={i} 
                        href={img} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-100 hover:ring-2 hover:ring-primary transition-all shadow-sm"
                      >
                        <img 
                          src={img} 
                          alt={`Attachment ${i + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* FOOTER */}
              <DialogFooter className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button variant="destructive">Cancel Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Empty State */}
      {!hasOrders && (
        <div className="text-center py-20 text-gray-500">
          <p>No orders found.</p>
        </div>
      )}
    </div>
  );
}
