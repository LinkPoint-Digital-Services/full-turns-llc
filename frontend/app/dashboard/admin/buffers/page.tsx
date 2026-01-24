'use client';

import React, {useState} from 'react';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {adminClient} from '@/features/admin/adminClient';
import {useMe} from '@/features/auth/hooks/useMe';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {GetBufferResponse} from '@/features/shared/types/api.types';
import BufferFormDialog from '@/features/admin/buffers/components/BufferFormDialog';
import BufferTable from '@/features/admin/buffers/components/BufferTable';

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

        <BufferFormDialog
          isOpen={isBufferModalOpen}
          setIsOpen={setIsBufferModalOpen}
          addBufferMutation={addBufferMutation}
          adminId={userData?.user._id || ''}
        />
      </div>

      <div className="mt-10">
        <BufferTable
          buffers={buffers?.data || []}
          isLoading={isLoading}
          onDelete={buffer_id =>
            deleteBufferMutation.mutate({
              admin_id: userData?.user._id || '',
              buffer_id
            })
          }
        />
      </div>
    </main>
  );
}
