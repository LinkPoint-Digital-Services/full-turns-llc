"use client";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderItem } from "../types/order.types";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: OrderItem[];
  cartTotal: number;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export const CartModal = ({
  open,
  onOpenChange,
  cartItems,
  cartTotal,
  onRemoveItem,
  onCheckout,
}: CartModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 py-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="pr-4 flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-1">
                    {item.name}
                  </p>
                  {item.details && (
                    <p className="text-sm text-gray-600 mb-2">
                      {item.details}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-primary whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              Total:
            </span>
            <span className="text-2xl font-bold text-primary">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
              disabled={cartItems.length === 0}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                onCheckout();
              }}
              className="w-full sm:w-auto"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
