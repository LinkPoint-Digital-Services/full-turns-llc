import Router from 'express';
import {
  addBuffer,
  deleteBuffer,
  getBuffers
} from '../controllers/admin/buffer.controller';
import {BlogController} from '../controllers/admin/blog.controller';
import { ServiceController } from '../controllers/admin/service.controller';
import { ItemController } from '../controllers/admin/item.controller';

const router = Router();

// Buffer Routes
router.post('/add-buffer', addBuffer);
router.delete('/delete-buffer', deleteBuffer);
router.get('/get-buffer', getBuffers);

// Blogs Routes
router.post(
  '/add-blog',
  BlogController.addBlog
);
router.patch(
  '/update-blog',
  BlogController.updateBlog
);
router.delete('/delete-blog', BlogController.deleteBlog);
router.get('/get-blog', BlogController.getBlogs);

// Services Routes
router.post('/add-service', ServiceController.addService);
router.patch('/update-service', ServiceController.updateService);
router.delete('/delete-service', ServiceController.deleteService);
router.get('/get-services', ServiceController.getServices);

// Items Routes
router.post('/add-item', ItemController.addItem);
router.patch('/update-item', ItemController.updateItem);
router.delete('/delete-item', ItemController.deleteItem);
router.get('/get-items', ItemController.getItems);

export default router;
