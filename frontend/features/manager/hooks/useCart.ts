import {useState, useMemo} from "react";
import {OrderItem} from "../types/order.types";
import {orderClient} from "../orderClient";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);

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

  const checkout = async (files?: File[]) => {
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

  return {
    cartItems,
    cartTotal,
    addItem,
    removeItem,
    clearCart,
    checkout,
  };
};
