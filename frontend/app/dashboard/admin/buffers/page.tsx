'use client';

import React, {useState} from 'react';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {adminClient} from '@/features/admin/adminClient';
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
import {useMe} from '@/features/auth/hooks/useMe';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {BufferItem} from '@/features/admin/types/buffer.types';
import {GetBufferResponse} from '@/features/shared/types/api.types';
import {Trash2} from 'lucide-react'; // ✅ icon import

export default function BuffersPage() {
  const {data: userData} = useMe();
  const [isBufferModalOpen, setIsBufferModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {data: buffers, isLoading} = useQuery<GetBufferResponse>({
    queryKey: ['buffers', userData?.user._id],
    queryFn: () => adminClient.getBuffer(userData?.user._id || '')
  });

  const addBufferMutation = useAppMutation({
    mutationFn: adminClient.addBuffer,
    successMessage: 'Buffer added successfully',
    errorMessage: 'Failed to add buffer',
    onSuccessExtra: () => {
      setIsBufferModalOpen(false);
      queryClient.invalidateQueries({queryKey: ['buffers']});
    }
  });

  const deleteBufferMutation = useAppMutation({
    mutationFn: adminClient.deleteBuffer,
    successMessage: 'Buffer deleted successfully',
    errorMessage: 'Failed to delete buffer',
    onSuccessExtra: () => {
      queryClient.invalidateQueries({queryKey: ['buffers']});
    }
  });

  const deleteSubmit = (buffer_id: string) => { 
    const admin_id = userData?.user._id || '';

    console.log('Deleting buffer with ID:', buffer_id);

    deleteBufferMutation.mutate({admin_id, buffer_id});
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const manager_name = formData.get('managername') as string;
    const buffer_price = formData.get('bufferprice') as string;

    addBufferMutation.mutate({
      manager_name,
      buffer_price,
      admin_id: userData?.user._id || ''
    });
  };

  return (
    <main className="mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Property Manager Buffers</h1>
          <p className="text-muted-foreground">
            Manage buffer amounts for property managers. When a property manager
            places an order, they will receive the specified buffer amount.
          </p>
        </div>

        <Dialog open={isBufferModalOpen} onOpenChange={setIsBufferModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add Buffer</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-106.25">
            <form onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle>Add Property Manager Buffer</DialogTitle>
                <DialogDescription>
                  Add new manager that will receive a buffer amount when placing
                  orders.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Manager Name (FullName)</Label>
                  <Input
                    id="name-1"
                    name="managername"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="buffername-1">Buffer Amount</Label>
                  <Input
                    id="buffername-1"
                    name="bufferprice"
                    placeholder="500"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={addBufferMutation.isPending}>
                  {addBufferMutation.isPending ? 'Adding...' : 'Add Buffer'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <p>Loading buffers...</p>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Manager</th>
                  <th className="px-4 py-2 text-left">Buffer Amount</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buffers?.data.map((buffer: BufferItem) => (
                  <tr
                    key={buffer._id}
                    className="border-t hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-2">{buffer.manager_name}</td>
                    <td className="px-4 py-2">{buffer.buffer_price}</td>
                    <td className="px-4 py-2 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteSubmit(buffer._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
