import Router from 'express';
import {authenticateToken} from '../middleware/auth.middleware';
import {getMe} from '../controllers/user/profile.controller';

const router = Router();
router.use(authenticateToken)

router.get('/verify-me', getMe);
// router.patch('/update-profile', updateProfile)

//sample dashboard route - router.post('/upload-product', uploadProductController);

export default router;  