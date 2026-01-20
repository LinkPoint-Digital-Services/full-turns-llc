import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import Router from 'express';

const router = Router();

router.use('/auth', authRoutes); //authRoutes
router.use('/user', userRoutes); //userRoutes

export default router;