"use client";

import React from "react";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {DialogTitle} from "@radix-ui/react-dialog";
import {Check} from "lucide-react";
import {OrderSummary} from "../types/order.types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderSummary;
}

export default function OrderConfirmationDialog({
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

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="h-5 w-5 text-emerald-600" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Order Confirmed!</h2>
        </div>

        {/* Receipt Card */}
        <div className="mt-6 bg-muted/50 rounded-xl p-6">
          {/* Order Date */}
          <div className="flex justify-between text-sm mb-4">
            <span className="text-muted-foreground">Order Date:</span>
            <span>{order.date}</span>
          </div>

          {/* Customer Info */}
          <div className="mt-6 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              {order.managerName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.managerEmail}
            </p>
          </div>

          {/* Items Table - Clean Minimal Style */}
          <div className="mt-6 max-h-60 overflow-y-auto">
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

        {/* Description */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Your order has been submitted successfully. You can track its status
          in the <span className="font-medium">&quot;My Orders&quot;</span> tab.
        </p>

        {/* Button */}
        <Button
          className="w-full mt-6 rounded-lg"
          variant="default"
          onClick={() => onOpenChange(false)}
        >
          Place Another Order
        </Button>
      </DialogContent>
    </Dialog>
  );
}
