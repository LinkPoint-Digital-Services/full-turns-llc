import {useState, useMemo} from 'react';
import {OrderItem} from '../types/order.types';

const ORDERS_STORAGE_KEY = 'fullturns-manager-orders';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const addItem = (item: OrderItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    if (cartItems.length === 0) return;

    const existingRaw =
      typeof window !== 'undefined'
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
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      status: 'Pending' as const,
      total,
      itemsCount,
      property: undefined
    };

    const updated = [newOrder, ...existing];
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    }

    clearCart();
  };

  return {
    cartItems,
    cartTotal,
    addItem,
    removeItem,
    clearCart,
    checkout
  };
};
