import { api } from '@/features/lib/axios/instance';
import { Endpoint } from '@/features/lib/endpoints';
import { CreateOrderRequest, BackendOrder, OrderStatus } from './types/order.types';
import { AxiosError } from 'axios';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const orderClient = {
  createOrder: async (payload: CreateOrderRequest, files?: File[]): Promise<ApiResponse<BackendOrder>> => {
    try {
      // Create FormData to send files
      const formData = new FormData();
      
      // Add order data as JSON string
      formData.append('items', JSON.stringify(payload.items));
      formData.append('totalAmount', payload.totalAmount.toString());
      formData.append('notes', payload.notes || '');
      formData.append('googleDriveLink', payload.googleDriveLink || '');
      
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
      const response = await api.post<ApiResponse<BackendOrder>>(Endpoint.orders.create, formData, {
        timeout: 60000 // Increase timeout to 60s for file uploads and email sending
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Order creation error:', error);
      if (error instanceof AxiosError && error.response?.data) {
        throw new Error(error.response.data.message || 'Failed to create order');
      }
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  },

  getMyOrders: async (): Promise<ApiResponse<BackendOrder[]>> =>
    api.get<ApiResponse<BackendOrder[]>>(Endpoint.orders.myOrders).then((res) => res.data),

  getAllOrders: async (): Promise<ApiResponse<BackendOrder[]>> =>
    api.get<ApiResponse<BackendOrder[]>>(Endpoint.orders.allOrders).then((res) => res.data),

  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<ApiResponse<BackendOrder>> =>
    api.patch<ApiResponse<BackendOrder>>(Endpoint.orders.updateStatus, { orderId, status }).then((res) => res.data),
};
