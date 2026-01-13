import authRoutes from './auth.routes';
import Router from 'express';

const router = Router();

router.use('/auth', authRoutes); //authRoutes


//add routes for property manager and admin later here

export default router;