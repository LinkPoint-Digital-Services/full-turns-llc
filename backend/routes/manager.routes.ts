import Router from 'express';
import {ProfileController} from '../controllers/manager/profile.controller';
import {ServiceController} from '../controllers/admin/service.controller';
import {ItemController} from '../controllers/admin/item.controller';

const router = Router();

router.patch('/update-profile', ProfileController.updateProfile);
router.get('/get-services', ServiceController.getServices);
router.get('/get-items', ItemController.getItems);

export default router;
