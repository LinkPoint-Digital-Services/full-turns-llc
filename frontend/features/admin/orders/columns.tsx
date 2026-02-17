/* eslint-disable @next/next/no-img-element */
"use client";

import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {OrderStatus, OrderSummary} from "./types";
import {Button} from "@/components/ui/button";
import {orderClient} from "@/features/manager/orderClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<OrderSummary>[] = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "itemsCount",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const count = row.getValue("itemsCount") as number;
      const items = row.original.items || [];
      const orderId = row.original.id;

      return (
        <div className="pl-4">
          {items.length > 0 ? (
            <Dialog>
              <DialogTrigger asChild>
                <span className="cursor-pointer underline decoration-dotted underline-offset-4 hover:text-primary transition-colors">
                  {count} items
                </span>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Items for Order {orderId}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4 max-h-[70vh] pr-2">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 px-1">
                      Order Items
                    </h3>
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col p-3 border rounded-lg bg-gray-50/50"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-gray-900">
                            {item.name}
                          </span>
                          <span className="text-sm font-medium">
                            x{item.quantity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">
                            Price: ${item.price.toLocaleString()}
                          </span>
                        </div>
                        {item.details && (
                          <pre className="mt-2 text-[11px] text-gray-600 bg-white p-2 rounded border whitespace-pre-wrap font-sans">
                            {item.details}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>

                  {row.original.images && row.original.images.length > 0 && (
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-sm font-semibold text-gray-900 px-1">
                        Order Images
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {row.original.images.map((img, i) => (
                          <a
                            key={i}
                            href={img}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-lg overflow-hidden border bg-gray-100 hover:ring-2 hover:ring-primary transition-all"
                          >
                            <img
                              src={img}
                              alt={`Order attachment ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <span>{count} items</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "managerName",
    header: "Manager",
    cell: ({row}) => row.original.managerName || "—",
  },
  {
    accessorKey: "total",
    header: ({column}) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const order = row.original;
      const handleStatusChange = async (value: OrderStatus) => {
        try {
          if (order.dbId) {
            await orderClient.updateOrderStatus(order.dbId, value);
            // Ideally we'd refresh the table here, but this is a cell component.
            // For now, we'll just log it. A better way would be using a state manager or refresh callback.
            console.log(`Order ${order.id} status changed to ${value}`);
          }
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      };

      const getStatusColor = (status: string) => {
        switch (status) {
          case "Completed":
            return "bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200";
          case "Processing":
            return "bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200";
          case "Cancelled":
            return "bg-red-100 text-red-700 hover:bg-red-100/80 border-red-200";
          default:
            return "bg-gray-100 text-gray-700 hover:bg-gray-100/80 border-gray-200"; // Pending
        }
      };

      return (
        <Select defaultValue={order.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px] h-8 border-none bg-transparent focus:ring-0 shadow-none p-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["Pending", "Processing", "Completed", "Cancelled"].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  <Badge variant="outline" className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      );
    },
  },
];
