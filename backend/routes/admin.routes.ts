import Router from 'express';
import {addBuffer, deleteBuffer, getBuffers} from '../controllers/admin/buffer.controller';

const router = Router();

router.post('/add-buffer', addBuffer);
router.delete('/delete-buffer', deleteBuffer);
router.get('/get-buffer', getBuffers);

// get all buffers
export default router;  