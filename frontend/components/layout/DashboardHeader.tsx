'use client';

import React from 'react';
import {authClient} from '@/features/auth/services/authClient';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {toast} from 'sonner';
import {useQueryClient} from '@tanstack/react-query';
import {Button} from '../ui/button';

export default function DashboardHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const result = await authClient.logout();
      if (result.message) {
        queryClient.removeQueries({queryKey: ['auth', 'me']});
        router.push('/login');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{message: string}>;
      toast.error(
        axiosError.response?.data.message ||
          axiosError.message ||
          'Logout failed. Please try again.'
      );
    }
  };

  return (
    <header className='flex items-center justify-between p-4 border-b'>
      <span>Logo</span>

      <div className='flex items-center gap-4'>
        <h4>Admin</h4>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}
