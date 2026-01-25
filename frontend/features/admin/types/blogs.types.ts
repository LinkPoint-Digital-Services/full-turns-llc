export interface AddBlogRequest {
  admin_id: string;
  blog: {
    blog_id: string;
    featured_image: string;
    title: string;
    description: string;
    content: string;
  };
}

export interface UpdateBlogRequest {
  admin_id: string;
  blogId: string;
  updateData: {
    featured_image?: string;
    title?: string;
    description?: string;
    content?: string;
  };
}

export interface DeleteBlogRequest {
  admin_id: string;
  blog_id: string;
}

export interface BlogItem {
  _id: string;
  blog_id: string;
  featured_image: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
}
