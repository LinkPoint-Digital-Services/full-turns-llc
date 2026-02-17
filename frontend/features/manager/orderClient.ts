import { api } from '@/features/lib/axios/instance';
import { Endpoint } from '@/features/lib/endpoints';
import { CreateOrderRequest } from './types/order.types';

export const orderClient = {
  createOrder: async (payload: CreateOrderRequest, files?: File[]) => {
    try {
      // Create FormData to send files
      const formData = new FormData();
      
      // Add order data as JSON string
      formData.append('items', JSON.stringify(payload.items));
      formData.append('totalAmount', payload.totalAmount.toString());
      
      // Add image files if provided
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('images', file);
        });
      }
      
      // Log FormData contents for debugging
      console.log('Sending order with:', {
        items: payload.items,
        totalAmount: payload.totalAmount,
        filesCount: files?.length || 0,
        endpoint: Endpoint.orders.create
      });
      
      // Don't set Content-Type header - axios will set it automatically with boundary
      const response = await api.post(Endpoint.orders.create, formData);
      return response.data;
    } catch (error: any) {
      console.error('Order creation error:', error);
      throw error;
    }
  },

  getMyOrders: () =>
    api.get(Endpoint.orders.myOrders).then((res) => res.data),

  getAllOrders: () =>
    api.get(Endpoint.orders.allOrders).then((res) => res.data),

  updateOrderStatus: (orderId: string, status: string) =>
    api.patch(Endpoint.orders.updateStatus, { orderId, status }).then((res) => res.data),
};
