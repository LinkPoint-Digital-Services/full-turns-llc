"use client";

import {OrdersTable, OrderSummary} from "@/features/admin/orders/OrdersTable";
import React from "react";

const sampleOrders: OrderSummary[] = [
  {
    id: "ORD-001",
    date: "2026-02-02",
    status: "Processing",
    total: 12500,
    itemsCount: 3,
    items: ["Full Paint Job", "Drywall Repair", "Deep Cleaning"],
    property: "FullTurn Condo",
  },
  {
    id: "ORD-002",
    date: "2026-02-01",
    status: "Completed",
    total: 8900,
    itemsCount: 2,
    items: ["Carpet Cleaning", "Window Washing"],
    property: "Sunrise Villas",
  },
  {
    id: "ORD-003",
    date: "2026-02-03",
    status: "Pending",
    total: 5400,
    itemsCount: 1,
    items: ["Plumbing Fix"],
  },
];

export default function ViewOrders() {
  return (
    <main className="mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Property Manager Orders</h1>
          <p className="text-muted-foreground">
            Track orders placed by property managers and see details like
            status, items count, total amount, and associated property.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <OrdersTable orders={sampleOrders} />
      </div>
    </main>
  );
}
