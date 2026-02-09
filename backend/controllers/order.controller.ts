import { Response } from 'express';
import { OrderService } from '../services/manager/order.service';
import { AuthRequest } from '../middleware/auth.middleware';

const orderService = new OrderService();

export class OrderController {
  static async createOrder(req: AuthRequest, res: Response) {
    try {
      const managerId = req.user?._id;
      if (!managerId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { items, totalAmount, images } = req.body;
      const orderId = `ORD-${Date.now()}`;
 
      const orderData = {
        orderId,
        managerId,
        items,
        totalAmount,
        status: 'Pending',
        images
      };

      const result = await orderService.createOrder(orderData as any);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getManagerOrders(req: AuthRequest, res: Response) {
    try {
      const managerId = req.user?._id;
      if (!managerId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const result = await orderService.getOrdersByManager(managerId as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllOrders(req: AuthRequest, res: Response) {
    try {
      // Check if user is admin
      if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const result = await orderService.getAllOrders();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateOrderStatus(req: AuthRequest, res: Response) {
    try {
      // Check if user is admin
      if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const { orderId, status } = req.body;
      const result = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
