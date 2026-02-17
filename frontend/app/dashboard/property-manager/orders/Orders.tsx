"use client";

import {useState} from "react";
import {StepMenu} from "./StepMenu";
import {StepService} from "./StepService";
import type {Item} from "@/features/manager/components";
import {
  CartSummary,
  CartModal,
  AddItemConfirmModal,
} from "@/features/manager/components";
import {OrderItem, OrderSummary} from "@/features/manager/types/order.types";
import {useCart} from "@/features/manager/hooks/useCart";
import OrderReceipt from "@/features/manager/components/OrderReceipt";

export default function OrdersPage() {
  const [step, setStep] = useState<"MENU" | "SERVICE">("MENU");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<Item | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [activeServiceId, setActiveServiceId] =
    useState<string | undefined>(undefined);
  const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);

  const {cartItems, cartTotal, addItem, removeItem, clearCart, checkout, generateOrderSummary} =
    useCart();

  const handleSimpleItemSelect = (item: Item) => {
    setPendingItem(item);
    setShowConfirmModal(true);
  };

  const confirmAddSimpleItem = () => {
    if (!pendingItem) return;

    const cartItem: OrderItem = {
      id: `${pendingItem.itemId}-${Date.now()}`,
      serviceId: pendingItem.itemId,
      name: pendingItem.name,
      price: pendingItem.basePrice,
      quantity: 1,
    };

    addItem(cartItem);
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

    addItem(cartItem);
  };

  const handleCancelOrder = () => {
    clearCart();
    setPendingItem(null);
    setShowConfirmModal(false);
    setStep("MENU");
  };

  const handleCheckout = async (files?: File[]) => {
    try {
      const summary = generateOrderSummary(files);
      setLastOrder(summary);
      await checkout(files);
      setShowCartModal(false);
      setShowReceipt(true)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-28 md:pb-0">
      {step === "MENU" && <StepMenu onCreateOrder={() => setStep("SERVICE")} />}

      {step === "SERVICE" && (
        <>
          <StepService
            onSelectItem={handleSimpleItemSelect}
            onAddConfiguredItem={handleConfiguredItemAdd}
            activeServiceId={activeServiceId}
            onServiceChange={setActiveServiceId}
          />

          <CartSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            onViewCart={() => setShowCartModal(true)}
            onCancelOrder={handleCancelOrder}
            onCheckout={() => setShowCartModal(true)}
          />
        </>
      )}

      {/* Confirmation Modal for simple items */}
      <AddItemConfirmModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        item={pendingItem}
        onConfirm={confirmAddSimpleItem}
      />

      {/* Cart Modal */}
      <CartModal
        open={showCartModal}
        onOpenChange={setShowCartModal}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <OrderReceipt 
        open={showReceipt} 
        onOpenChange={setShowReceipt} 
        order={lastOrder || generateOrderSummary()} 
      />
    </div>
  );
}
