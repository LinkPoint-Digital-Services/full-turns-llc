import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import Router from 'express';

const router = Router();

router.use('/auth', authRoutes); //authRoutes
router.use('/user', userRoutes); //userRoutes
router.use('/admin', adminRoutes); //adminRoutes

export default router;