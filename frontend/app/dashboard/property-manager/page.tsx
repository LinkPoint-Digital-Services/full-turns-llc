'use client';

import React, {useEffect} from 'react';
import {authClient} from '@/features/auth/services/authClient';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '@/app/loading';
import {useQueryClient} from '@tanstack/react-query';

export default function ManagerPage() {
  const router = useRouter();
  const {data: userData, isLoading, isError} = useMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) router.replace('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading, router]);

  useEffect(() => {
    if (isLoading) return;

    const role = userData?.user?.role;
    if (role === 'admin') {
      router.replace('/dashboard/admin');
      return;
    }
    if (isError || role !== 'manager') {
      router.replace('/login');
    }
  }, [isError, isLoading, router, userData]);

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

  if (isLoading) return <Loading />;

  if (!userData?.user) return null;

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
