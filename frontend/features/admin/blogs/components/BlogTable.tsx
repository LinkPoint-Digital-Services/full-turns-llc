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
    return <p>Loading blog posts...</p>;
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
