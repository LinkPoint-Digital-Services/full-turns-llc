"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StepMenu } from "./StepMenu";
import { StepService } from "./StepService";
import {
  ServiceItem,
  calculateServicePrice,
} from "@/features/manager/components/serviceData";
import { OrderItem } from "@/features/manager/types/order.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ORDERS_STORAGE_KEY = "fullturns-manager-orders";

export default function OrdersPage() {
  const [step, setStep] = useState<"MENU" | "SERVICE">("MENU");
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<ServiceItem | null>(null);

  const router = useRouter();

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleSimpleItemSelect = (item: ServiceItem) => {
    setPendingItem(item);
    setShowConfirmModal(true);
  };

  const confirmAddSimpleItem = () => {
    if (!pendingItem) return;

    const basePrice = calculateServicePrice(pendingItem.id);

    const cartItem: OrderItem = {
      id: `${pendingItem.id}-${Date.now()}`,
      serviceId: pendingItem.id,
      name: pendingItem.name,
      price: basePrice,
      quantity: 1,
    };

    setCartItems((prev) => [...prev, cartItem]);
    setPendingItem(null);
    setShowConfirmModal(false);
  };

  const handleConfiguredItemAdd = (item: {
    serviceId: string;
    name: string;
    price: number;
    details: string;
  }) => {
    const cartItem: OrderItem = {
      id: `${item.serviceId}-${Date.now()}`,
      serviceId: item.serviceId,
      name: item.name,
      price: item.price,
      quantity: 1,
      details: item.details,
    };

    setCartItems((prev) => [...prev, cartItem]);
  };

  const handleCancelOrder = () => {
    setCartItems([]);
    setPendingItem(null);
    setShowConfirmModal(false);
    setStep("MENU");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const existingRaw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(ORDERS_STORAGE_KEY)
        : null;
    const existing: Array<{
      id: string;
      date: string;
      status: string;
      total: number;
      itemsCount: number;
      property?: string;
    }> = existingRaw ? JSON.parse(existingRaw) : [];

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemsCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Pending" as const,
      total,
      itemsCount,
      property: undefined,
    };

    const updated = [newOrder, ...existing];
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    }

    setCartItems([]);
    setStep("MENU");
    router.push("/dashboard/property-manager/my-orders");
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-28 md:pb-0">
      {step === "MENU" && (
        <StepMenu onCreateOrder={() => setStep("SERVICE")} />
      )}

      {step === "SERVICE" && (
        <>
          <StepService
            onSelectItem={handleSimpleItemSelect}
            onAddConfiguredItem={handleConfiguredItemAdd}
          />

          {/* Cart Summary */}
          <div className="fixed left-0 right-0 bottom-0 z-20 md:static md:z-auto border-t md:border md:border-gray-100 rounded-t-2xl md:rounded-xl bg-white p-4 md:p-6 space-y-4 shadow-[0_-8px_20px_rgba(15,23,42,0.12)] md:shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Cart
                </h3>
                <p className="text-[11px] md:text-xs text-gray-500">
                  Review items before checkout or cancel the order.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] md:text-xs text-gray-500">Total</p>
                <p className="text-base md:text-lg font-bold text-primary">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="space-y-2 max-h-56 overflow-y-auto -mx-1 px-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between border border-gray-100 rounded-lg px-3 py-2 bg-gray-50"
                  >
                    <div className="pr-2">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      {item.details && (
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                          {item.details}
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-primary whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleCancelOrder}
                className="w-full sm:w-auto text-sm"
                disabled={cartItems.length === 0}
              >
                Cancel Order
              </Button>
              <Button
                onClick={handleCheckout}
                className="w-full sm:w-auto text-sm"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Modal for simple items */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Add service to order?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mt-2">
            {pendingItem
              ? `Do you want to add “${pendingItem.name}” to your cart?`
              : "Do you want to add this service to your cart?"}
          </p>
          <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setPendingItem(null);
                setShowConfirmModal(false);
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAddSimpleItem}
              className="w-full sm:w-auto"
            >
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

