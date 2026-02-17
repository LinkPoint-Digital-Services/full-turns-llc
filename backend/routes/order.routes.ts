import { Router } from 'express';
import { OrderController } from '../controllers/manager/order.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { upload } from '../middleware/multer.middleware';

const router = Router();

// Manager and Admin shared/specific routes
router.post('/create', upload.array('images', 3), authenticateToken as any, OrderController.createOrder as any);
router.get('/my-orders', authenticateToken as any, OrderController.getManagerOrders as any);

// Admin only routes
router.get('/all', authenticateToken as any, OrderController.getAllOrders as any);
router.patch('/update-status', authenticateToken as any, OrderController.updateOrderStatus as any);

export default router;
