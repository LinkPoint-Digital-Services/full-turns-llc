"use client";

import React from "react";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {DialogTitle} from "@radix-ui/react-dialog";
import {OrderSummary} from "../types/order.types";
import {Badge} from "@/components/ui/badge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderSummary;
}

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

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-2xl md:p-8">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        {/* Title with Order ID and Status */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Order Details</h2>
        </div>

        {/* Receipt Card */}
        <div className="mt-6 bg-muted/50 rounded-xl p-6">
          {/* Order Info */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date:</span>
              <span>{order.date}</span>
            </div>
          </div>

          {/* Customer Info */}
          {(order.managerName || order.managerEmail) && (
            <div className="mt-6 space-y-1 text-sm border-t pt-4">
              <h3 className="font-semibold mb-2">Customer Information</h3>
              {order.managerName && (
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {order.managerName}
                </p>
              )}
              {order.managerEmail && (
                <p>
                  <span className="font-semibold">Email:</span> {order.managerEmail}
                </p>
              )}
            </div>
          )}

          {/* Items Table - Clean Minimal Style */}
          <div className="mt-6 border-t pt-4 max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-3 text-sm">Order Items</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="text-left pb-3 font-medium">Item</th>
                  <th className="text-center pb-3 font-medium">Qty</th>
                  <th className="text-right pb-3 font-medium">Price</th>
                  <th className="text-right pb-3 font-medium">Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="py-4">
                      {item.name}
                      {item.details && (
                        <p className="text-xs text-muted-foreground">
                          {item.details}
                        </p>
                      )}
                    </td>

                    <td className="text-center py-4">{item.quantity}</td>

                    <td className="text-right py-4">
                      ${item.price.toLocaleString()}
                    </td>

                    <td className="text-right py-4 font-semibold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="border-t mt-6 pt-4 flex justify-between text-base font-semibold">
            <span>Total Amount:</span>
            <span className="text-primary">
              ${order.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <Button
          className="w-full mt-6 rounded-lg"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
