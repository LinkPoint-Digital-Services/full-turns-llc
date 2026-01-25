import {AdminModel} from '../../models/user.model';
import {IBlogs} from '../../interfaces/admin/IBlogs';

export class BlogService {
  static async addBlog(admin_id: string, blog: IBlogs) {
    return AdminModel.findByIdAndUpdate(
      admin_id,
      {$push: {blogs: blog}},
      {new: true}
    );
  }

  static async updateBlog(
    admin_id: string,
    blogId: string,
    updateData: Partial<IBlogs>
  ) {
    return AdminModel.findOneAndUpdate(
      {_id: admin_id, 'blogs.blog_id': blogId},
      {
        $set: {
          'blogs.$.title': updateData.title,
          'blogs.$.description': updateData.description,
          'blogs.$.content': updateData.content,
          'blogs.$.featured_image': updateData.featured_image,
          'blogs.$.updated_at': new Date()
        }
      },
      {new: true}
    );
  }

  static async deleteBlog(admin_id: string, blogId: string) {
    return AdminModel.findByIdAndUpdate(
      admin_id,
      {$pull: {blogs: {blog_id: blogId}}},
      {new: true}
    );
  }

  static async getBlogs(admin_id: string) {
    const admin = await AdminModel.findById(admin_id).select('blogs');
    return admin?.blogs || [];
  }
}
