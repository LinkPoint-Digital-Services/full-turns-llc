import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Manager and Admin shared/specific routes
router.post('/create', authenticateToken as any, OrderController.createOrder as any);
router.get('/my-orders', authenticateToken as any, OrderController.getManagerOrders as any);

// Admin only routes
router.get('/all', authenticateToken as any, OrderController.getAllOrders as any);
router.patch('/update-status', authenticateToken as any, OrderController.updateOrderStatus as any);

export default router;
