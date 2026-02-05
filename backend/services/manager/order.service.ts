import { OrderRepository } from '../../repositories/order.repository';
import { IOrder } from '../../interfaces/manager/IOrder';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(orderData: Partial<IOrder>) {
    return this.orderRepository.create(orderData as any);
  }

  async getOrdersByManager(managerId: string) {
    return this.orderRepository.find({ managerId } as any);
  }

  async getAllOrders() {
    return this.orderRepository.findWithManager({});
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.orderRepository.updateById(orderId, { status } as any);
  }

  async getOrderById(id: string) {
    return this.orderRepository.findById(id);
  }
}
