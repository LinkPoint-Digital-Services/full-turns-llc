import React from 'react';
import {Button} from '@/components/ui/button';
import {UseMutationResult} from '@tanstack/react-query';
import {AddBufferRequest} from '@/features/admin/types/buffer.types';
import {MsgResponse} from '@/features/shared/types/api.types';
import {AxiosError} from 'axios';
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

interface BufferFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addBufferMutation: UseMutationResult<
    MsgResponse,
    AxiosError<{message: string}>,
    AddBufferRequest,
    unknown
  >;
  adminId: string;
}

export default function BufferFormDialog({
  isOpen,
  setIsOpen,
  addBufferMutation,
  adminId
}: BufferFormDialogProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const manager_name = formData.get('managername') as string;
    const buffer_price = formData.get('bufferprice') as string;

    addBufferMutation.mutate({
      manager_name,
      buffer_price,
      admin_id: adminId
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <Input id="name-1" name="managername" placeholder="John Doe" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="buffername-1">Buffer Amount</Label>
              <Input id="buffername-1" name="bufferprice" placeholder="500" />
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
  );
}
