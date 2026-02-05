'use client';

import React, {useState} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useMe} from '@/features/auth/hooks/useMe';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {adminClient} from '@/features/admin/adminClient';
import {GetBlogResponse} from '@/features/shared/types/api.types';
import {uploadToCloudinary} from '@/lib/cloudinary';

import BlogFormDialog from '@/features/admin/blogs/components/BlogFormDialog';
import BlogTable from '@/features/admin/blogs/components/BlogTable';

type Blog = GetBlogResponse['data'][0];

export default function BlogsPage() {
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

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

  const updateBlogMutation = useAppMutation({
    mutationFn: adminClient.updateBlog,
    successMessage: 'Blog post updated successfully',
    errorMessage: 'Failed to update blog post',
    onSuccessExtra: () => {
      setIsBlogModalOpen(false);
      setPreviewImage(null);
      setSelectedBlog(null);
      queryClient.invalidateQueries({queryKey: ['blogs']});
    }
  });

  const deleteBlogMutation = useAppMutation({
    mutationFn: adminClient.deleteBlog,
    successMessage: 'Blog post deleted successfully',
    errorMessage: 'Failed to delete blog post',
    onSuccessExtra: () => {
      queryClient.invalidateQueries({queryKey: ['blogs']});
    }
  });

  const onSubmitBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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

    if (selectedBlog) {
      updateBlogMutation.mutate({
        admin_id: userData?.user._id || '',
        blogId: selectedBlog.blog_id,
        updateData: {title, description, content, featured_image: imageUrl}
      });
    } else {
      addBlogMutation.mutate({
        admin_id: userData?.user._id || '',
        blog: {
          blog_id: crypto.randomUUID(),
          featured_image: imageUrl,
          title,
          description,
          content
        }
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold">Blog Posts</h1>
        <BlogFormDialog
          isOpen={isBlogModalOpen}
          setIsOpen={setIsBlogModalOpen}
          selectedBlog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          isUploading={isUploading}
          onSubmitBlog={onSubmitBlog}
          handleImageChange={handleImageChange}
          addBlogMutation={addBlogMutation}
          updateBlogMutation={updateBlogMutation}
        />
      </div>

      <BlogTable
        blogs={blogs?.data || []}
        isLoading={isLoading}
        onEdit={blog => {
          setSelectedBlog(blog);
          setPreviewImage(null);
          setIsBlogModalOpen(true);
        }}
        onDelete={blogId =>
          deleteBlogMutation.mutate({
            admin_id: userData?.user._id || '',
            blog_id: blogId
          })
        }
      />
    </main>
  );
}
