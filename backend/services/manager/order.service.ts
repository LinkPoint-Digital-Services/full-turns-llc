import { OrderRepository } from '../../repositories/order.repository';
import { IOrder, OrderStatus } from '../../interfaces/manager/IOrder';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(orderData: Omit<IOrder, '_id' | 'createdAt' | 'updatedAt'>): Promise<IOrder> {
    return this.orderRepository.create(orderData);
  }

  async getOrdersByManager(managerId: string): Promise<IOrder[]> {
    return this.orderRepository.find({ managerId });
  }

  async getAllOrders(): Promise<IOrder[]> {
    return this.orderRepository.findWithManager({});
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<IOrder | null> {
    return this.orderRepository.updateById(orderId, { status });
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    return this.orderRepository.findById(id);
  }
}
