import {Request, Response} from 'express';
import {BlogService} from '../../services/admin/blog.service';

export class BlogController {
  static async addBlog(req: Request, res: Response) {
    try {
      const {admin_id, blog} = req.body;

      const result = await BlogService.addBlog(admin_id, blog);

      res.status(201).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  static async updateBlog(req: Request, res: Response) {
    try {
      const {admin_id, blogId, updateData} = req.body;

      const result = await BlogService.updateBlog(admin_id, blogId, updateData);

      res.status(200).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  static async deleteBlog(req: Request, res: Response) {
    try {
      const {admin_id, blog_id} = req.body;
      const result = await BlogService.deleteBlog(admin_id, blog_id);
      res.status(200).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  static async getBlogs(req: Request, res: Response) {
    try {
      const {admin_id} = req.query;
      const result = await BlogService.getBlogs(admin_id as string);
      res.status(200).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }
}
