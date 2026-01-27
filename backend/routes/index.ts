import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import managerRoutes from './manager.routes';
import Router from 'express';

const router = Router();

router.use('/auth', authRoutes); //authRoutes
router.use('/user', userRoutes); //userRoutes
router.use('/admin', adminRoutes); //adminRoutes
router.use('/manager', managerRoutes) //managerRoutes

export default router;