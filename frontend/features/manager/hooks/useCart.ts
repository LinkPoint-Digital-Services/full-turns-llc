import {useState, useMemo} from "react";
import {OrderItem, OrderSummary} from "../types/order.types";
import {orderClient} from "../orderClient";
import {useMe} from "@/features/auth/hooks/useMe";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const { data: userData } = useMe();

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const addItem = (item: OrderItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = async (files?: File[], notes?: string, googleDriveLink?: string) => {
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }
 
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
 
    try {
      const result = await orderClient.createOrder({
        items: cartItems.map((item) => ({
          itemId: item.serviceId, // In OrderItem, serviceId is used for the catalog item ID
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          details: item.details,
        })),
        totalAmount,
        notes: notes || "",
        googleDriveLink: googleDriveLink || ""
      }, files);
      
      console.log('Order created successfully:', result);
      clearCart();
      return result;
    } catch (error: unknown) {
      console.error("Checkout failed:", error);
      // Re-throw with more context
      const errorMessage = error instanceof Error ? error.message : "Failed to create order. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const generateOrderSummary = (files?: File[], notes?: string, googleDriveLink?: string): OrderSummary => {
    const user = userData?.user;
    return {
      id: `preview-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Pending",
      total: cartTotal,
      itemsCount: cartItems.length,
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        details: item.details,
      })),
      images: files ? files.map((file) => URL.createObjectURL(file)) : [],
      managerName: user ? `${user.first_name} ${user.last_name}` : undefined,
      managerEmail: user?.email_address,
      notes,
      googleDriveLink
    };
  };

  return {
    cartItems,
    cartTotal,
    addItem,
    removeItem,
    clearCart,
    checkout,
    generateOrderSummary,
  };
};
