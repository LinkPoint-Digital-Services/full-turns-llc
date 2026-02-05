"use client";

import { useState } from "react";
import { ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderItem } from "../types/order.types";

interface CartSummaryProps {
  cartItems: OrderItem[];
  cartTotal: number;
  onViewCart: () => void;
  onCancelOrder: () => void;
  onCheckout: () => void;
}

export const CartSummary = ({
  cartItems,
  cartTotal,
  onViewCart,
  onCancelOrder,
  onCheckout,
}: CartSummaryProps) => {
  const [isCartExpanded, setIsCartExpanded] = useState(true);

  return (
    <div className="fixed left-0 right-0 bottom-0 border-t md:border md:border-gray-300 rounded-t-2xl md:rounded-xl bg-white p-4 md:p-6 space-y-4 z-40">
      <button
        onClick={() => setIsCartExpanded(!isCartExpanded)}
        className="w-full flex items-center justify-between gap-3"
      >
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900 text-left">
            Cart
          </h3>
          <p className="text-[11px] md:text-xs text-gray-500 text-left">
            Review items before checkout or cancel the order.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] md:text-xs text-gray-500">Total</p>
            <p className="text-base md:text-lg font-bold text-primary">
              ${cartTotal.toFixed(2)}
            </p>
          </div>
          {isCartExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {isCartExpanded && (
        <>
          {cartItems.length > 0 && (
            <button
              onClick={onViewCart}
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  View Cart Items
                </span>
              </div>
              <span className="text-sm font-semibold text-primary">
                ${cartTotal.toFixed(2)}
              </span>
            </button>
          )}

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onCancelOrder}
              className="w-full sm:w-auto text-sm"
              disabled={cartItems.length === 0}
            >
              Cancel Order
            </Button>
            <Button
              onClick={onCheckout}
              className="w-full sm:w-auto text-sm"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
