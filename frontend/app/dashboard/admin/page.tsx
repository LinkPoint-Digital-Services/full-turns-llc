'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '@/app/loading';
import DashboardHeader from '@/components/layout/DashboardHeader';
import {Button} from '@/components/ui/button';
import BuffersPage from './buffers/page';
import BlogsPage from './blogs/page';
import ServicesPage from './services/page';
import BackupPage from './backup/page';

export default function AdminPage() {
  const router = useRouter();
  const {data: userData, isLoading, isError} = useMe();
  type AdminTab = 'buffers' | 'blogs' | 'services' | 'backup' | null;
  const [activeTab, setActiveTab] = useState<AdminTab>('buffers');

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
      <main className="p-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p>Manage property managers, blogs, services, and data backups</p>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab('buffers')}
              className={
                activeTab === 'buffers' ? 'bg-orange-500 text-white' : ''
              }
            >
              Buffers
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveTab('blogs')}
              className={
                activeTab === 'blogs' ? 'bg-orange-500 text-white' : ''
              }
            >
              Blogs
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveTab('services')}
              className={
                activeTab === 'services' ? 'bg-orange-500 text-white' : ''
              }
            >
              Services
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveTab('backup')}
              className={
                activeTab === 'backup' ? 'bg-orange-500 text-white' : ''
              }
            >
              Backup
            </Button>
          </div>

          <div>
            {activeTab === 'buffers' && <BuffersPage />}
            {activeTab === 'blogs' && <BlogsPage />}
            {activeTab === 'services' && <ServicesPage />}
            {activeTab === 'backup' && <BackupPage />}
          </div>
        </div>
      </main>
    </>
  );
}
