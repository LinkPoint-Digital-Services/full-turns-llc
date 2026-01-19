'use client';

import React from 'react';
import ManagerPage from './property-manager/page';
import AdminPage from './admin/page';
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '../loading';
import Unauthorized from '../unauthorized';

export default function DashboardLayout() {
  const {data: userData, isLoading, isError} = useMe();

  if (isLoading) return <Loading />;
  if (isError || !userData?.user?._id) return <Unauthorized />;

  switch (userData.user.role) {
    case 'manager':
      return <ManagerPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <Unauthorized />;
  }
}
