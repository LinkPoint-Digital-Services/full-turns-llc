'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '@/app/loading';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function AdminPage() {
  const router = useRouter();
  const {data: userData, isLoading, isError} = useMe();

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

  return (
    <>
      <DashboardHeader />
      <main className='p-4'>
        <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>
        <p>Manage property managers, blogs, services, and data backups</p>

        di
      </main>
    </>
  );
}
