import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { GetBlogResponse } from '@/features/shared/types/api.types';

type MutationState = {
  isPending: boolean;
};

type Blog = GetBlogResponse['data'][0];

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedBlog: Blog | null;
  setSelectedBlog: (blog: Blog | null) => void;
  previewImage: string | null;
  setPreviewImage: (img: string | null) => void;
  isUploading: boolean;
  onSubmitBlog: (e: React.FormEvent<HTMLFormElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addBlogMutation: MutationState;
  updateBlogMutation: MutationState;
};

export default function BlogFormDialog({
  isOpen,
  setIsOpen,
  selectedBlog,
  setSelectedBlog,
  previewImage,
  setPreviewImage,
  isUploading,
  onSubmitBlog,
  handleImageChange,
  addBlogMutation,
  updateBlogMutation
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => {
            setSelectedBlog(null);
            setPreviewImage(null);
          }}
        >
          Create Blog Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150">
        <form onSubmit={onSubmitBlog}>
          <DialogHeader>
            <DialogTitle>
              {selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              {selectedBlog
                ? 'Update the fields below to edit your blog entry.'
                : 'Fill out the fields below to publish a new blog entry.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* IMAGE */}
            <div className="grid gap-2">
              <Label htmlFor="featured_image">Featured Image</Label>
              <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md h-40 cursor-pointer hover:border-gray-400 transition overflow-hidden">
                {previewImage || selectedBlog?.featured_image ? (
                  <Image
                    src={previewImage || (selectedBlog?.featured_image as string)}
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

                {/* Hidden file input */}
                <input
                  id="featured_image"
                  name="featured_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {/* Change Photo button (only show when editing or preview exists) */}
                {(selectedBlog || previewImage) && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => {
                      document.getElementById('featured_image')?.click();
                    }}
                  >
                    Change Photo
                  </Button>
                )}
              </div>
            </div>

            {/* TITLE */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={selectedBlog?.title} />
            </div>

            {/* DESCRIPTION */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue={selectedBlog?.description} />
            </div>

            {/* CONTENT */}
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" defaultValue={selectedBlog?.content} rows={6} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={addBlogMutation.isPending || updateBlogMutation.isPending || isUploading}
            >
              {selectedBlog
                ? updateBlogMutation.isPending || isUploading
                  ? 'Updating...'
                  : 'Update Blog Post'
                : addBlogMutation.isPending || isUploading
                  ? 'Creating...'
                  : 'Create Blog Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
