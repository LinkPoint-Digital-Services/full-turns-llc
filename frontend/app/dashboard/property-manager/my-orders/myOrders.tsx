"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronRight,
  Package,
  Calendar,
  DollarSign,
} from "lucide-react";
import type { OrderSummary } from "@/features/manager/types/order.types";

const ORDERS_STORAGE_KEY = "fullturns-manager-orders";

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed: OrderSummary[] = JSON.parse(stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders(parsed);
    } catch {
      // ignore parse errors
    }
  }, []);

  const hasOrders = orders.length > 0;

  return (
    <div className="space-y-4 md:space-y-6 pb-4">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            My Orders
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            View and track your recent orders.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by Order ID or Property..."
          className="pl-9 max-w-full md:max-w-md text-sm"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-3 md:space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
          >
            {/* Left Side: Icon & Basic Info */}
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
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span className="truncate max-w-[200px]">
                    {order.property}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: Metrics */}
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
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Right Side: Action Arrow */}
            <div className="hidden md:flex items-center justify-end w-full md:w-auto pl-4">
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
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

