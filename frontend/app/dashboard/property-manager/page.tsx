'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '@/app/loading';
import DashboardHeader from '@/components/layout/DashboardHeader';
import {Button} from '@/components/ui/button';
import OrdersPage from './orders/page';
import MyOrdersPage from './my-orders/page';
import SettingsPage from './settings/page';

export default function ManagerPage() {
  const router = useRouter();
  const {data: userData, isLoading, isError} = useMe();
  type ManagerTab = 'orders' | 'my-orders' | 'settings' | null;
  const [activeTab, setActiveTab] = useState<ManagerTab>('orders');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) router.replace('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading, router]);

  useEffect(() => {
    if (isLoading) return;

    if (!userData?.user) return;

    const role = userData.user.role;

    if (role === 'admin') {
      router.replace('/dashboard/admin');
      return;
    }

    if (isError || role !== 'manager') {
      router.replace('/login');
      return;
    }
  }, [isError, isLoading, router, userData]);

  if (isLoading) return <Loading />;
  if (!userData?.user) return <Loading />;

  return (
    <>
      <DashboardHeader />
      <main className="p-4">
        <div>
          <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
          <p>Manage orders, view my orders, and update settings</p>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab('orders')}
              className={
                activeTab === 'orders' ? 'bg-orange-500 text-white' : ''
              }
            >
              Orders
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveTab('my-orders')}
              className={
                activeTab === 'my-orders' ? 'bg-orange-500 text-white' : ''
              }
            >
              My Orders
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveTab('settings')}
              className={
                activeTab === 'settings' ? 'bg-orange-500 text-white' : ''
              }
            >
              Settings
            </Button>
          </div>

          <div>
            {activeTab === 'orders' && <OrdersPage />}
            {activeTab === 'my-orders' && <MyOrdersPage />}
            {activeTab === 'settings' && <SettingsPage />}
          </div>
        </div>
      </main>
    </>
  );
}
