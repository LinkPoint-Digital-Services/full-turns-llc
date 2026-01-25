import {Button} from '@/components/ui/button';
import {Pencil, Trash2} from 'lucide-react';
import Image from 'next/image';
import {GetBlogResponse} from '@/features/shared/types/api.types';

type Blog = GetBlogResponse['data'][0];

type Props = {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
};

export default function BlogCard({blog, onEdit, onDelete}: Props) {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-40 w-full">
        <Image
          src={blog.featured_image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{blog.title}</h2>
        <p className="text-sm text-muted-foreground">{blog.description}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(blog)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(blog.blog_id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
