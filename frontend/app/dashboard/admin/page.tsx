'use client';

import React, {useEffect} from 'react';
import {authClient} from '@/features/auth/services/authClient';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '@/app/loading';
import {useQueryClient} from '@tanstack/react-query';

export default function AdminPage() {
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

    // Only run redirect logic if we actually have a user object
    if (!userData?.user) return;

    const role = userData.user.role;

    if (role === 'manager') {
      router.replace('/dashboard/property-manager');
      return;
    }

    if (isError || role !== 'admin') {
      router.replace('/login');
      return;
    }
  }, [isLoading, isError, userData, router]);

  if (isLoading) return <Loading />;
  if (!userData?.user) return <Loading />;

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
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
