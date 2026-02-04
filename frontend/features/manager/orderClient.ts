import { api } from '@/features/lib/axios/instance';
import { Endpoint } from '@/features/lib/endpoints';
import { OrderItem } from './types/order.types';

export const orderClient = {
  createOrder: (payload: { items: OrderItem[]; totalAmount: number }) =>
    api.post(Endpoint.orders.create, payload).then((res) => res.data),

  getMyOrders: () =>
    api.get(Endpoint.orders.myOrders).then((res) => res.data),

  getAllOrders: () =>
    api.get(Endpoint.orders.allOrders).then((res) => res.data),

  updateOrderStatus: (orderId: string, status: string) =>
    api.patch(Endpoint.orders.updateStatus, { orderId, status }).then((res) => res.data),
};
