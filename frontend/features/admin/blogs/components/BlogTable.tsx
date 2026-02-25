import BlogCard from './BlogCard';
import {GetBlogResponse} from '@/features/shared/types/api.types';

type Blog = GetBlogResponse['data'][0];

type Props = {
  blogs: Blog[];
  isLoading: boolean;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
};

export default function BlogTable({blogs, isLoading, onEdit, onDelete}: Props) {
  if (isLoading) {
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-6">
        No blog posts found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <BlogCard
          key={blog._id}
          blog={blog}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
