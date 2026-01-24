import Router from 'express';
import {
  addBuffer,
  deleteBuffer,
  getBuffers
} from '../controllers/admin/buffer.controller';
import {BlogController} from '../controllers/admin/blog.controller';
import multer from 'multer';

const router = Router();

const upload = multer({dest: 'uploads/'});

// Buffer Routes
router.post('/add-buffer', addBuffer);
router.delete('/delete-buffer', deleteBuffer);
router.get('/get-buffer', getBuffers);

// Blogs Routes
router.post(
  '/add-blog',
  upload.single('featured_image'),
  BlogController.addBlog
);
router.patch(
  '/update-blog',
  upload.single('featured_image'),
  BlogController.updateBlog
);
router.delete('/delete-blog', BlogController.deleteBlog);
router.get('/get-blog', BlogController.getBlogs);


// Services Routes

export default router;
