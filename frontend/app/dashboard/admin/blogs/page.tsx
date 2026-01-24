'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {UploadCloud, Trash2, Pencil} from 'lucide-react';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {adminClient} from '@/features/admin/adminClient';
import {useQueryClient, useQuery} from '@tanstack/react-query';
import {useMe} from '@/features/auth/hooks/useMe';
import Image from 'next/image';
import {GetBlogResponse} from '@/features/shared/types/api.types';
import {uploadToCloudinary} from '@/lib/cloudinary';

export default function BlogsPage() {
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  const {data: userData} = useMe();

  const {data: blogs, isLoading} = useQuery<GetBlogResponse>({
    queryKey: ['blogs', userData?.user._id],
    queryFn: () => adminClient.getBlog(userData?.user._id || '')
  });

  const addBlogMutation = useAppMutation({
    mutationFn: adminClient.addBlog,
    successMessage: 'Blog post created successfully',
    errorMessage: 'Failed to create blog post',
    onSuccessExtra: () => {
      setIsBlogModalOpen(false);
      setPreviewImage(null);
      queryClient.invalidateQueries({queryKey: ['blogs']});
    }
  });

  const onSubmitBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const blog_id = crypto.randomUUID();
    const featured_image = formData.get('featured_image') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;

    let imageUrl = '';
    if (featured_image) {
      setIsUploading(true);
      imageUrl = await uploadToCloudinary(featured_image);
      setIsUploading(false);
    }

    const payload = {
      admin_id: userData?.user._id || '',
      blog: {
        blog_id,
        featured_image: imageUrl,
        title,
        description,
        content
      }
    };

    addBlogMutation.mutate(payload);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Blog Posts</h1>

        <Dialog open={isBlogModalOpen} onOpenChange={setIsBlogModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Create Blog Post</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-150">
            <form onSubmit={onSubmitBlog}>
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>
                  Fill out the fields below to publish a new blog entry.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="featured_image">Featured Image</Label>
                  <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md h-40 cursor-pointer hover:border-gray-400 transition overflow-hidden">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-gray-500" />
                        <span className="text-sm text-gray-500 mt-2">
                          Upload Photo
                        </span>
                      </>
                    )}
                    <input
                      id="featured_image"
                      name="featured_image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Brief description"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Full blog post content"
                    rows={6}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={addBlogMutation.isPending || isUploading}
                >
                  {addBlogMutation.isPending || isUploading
                    ? 'Creating...'
                    : 'Create Blog Post'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blog List */}
      {isLoading ? (
        <p>Loading blog posts...</p>
      ) : blogs?.data.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">
          No blog posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.data.map(blog => (
            <div
              key={blog._id}
              className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={blog.featured_image}
                  alt={blog.featured_image}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {blog.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
