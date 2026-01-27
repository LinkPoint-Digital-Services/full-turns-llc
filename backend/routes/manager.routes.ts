import Router from 'express';
import {ProfileController} from '../controllers/manager/profile.controller';

const router = Router();

router.patch('/update-profile', ProfileController.updateProfile);

export default router;
