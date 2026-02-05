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

  const checkout = async () => {
    if (cartItems.length === 0) return;

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    try {
      await orderClient.createOrder({
        items: cartItems.map((item) => ({
          itemId: item.serviceId, // In OrderItem, serviceId is used for the catalog item ID
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          details: item.details,
        })),
        totalAmount,
      });
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      throw error;
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
