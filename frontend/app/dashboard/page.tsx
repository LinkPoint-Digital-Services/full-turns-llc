'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation'; // App Router
import {useMe} from '@/features/auth/hooks/useMe';
import Loading from '../loading';
import Unauthorized from '../unauthorized';

export default function DashboardPage() {
  const {data: userData, isLoading, isError} = useMe();
  const router = useRouter();

  useEffect(() => {
    console.log("User Data:", userData);

    if (!isLoading && !isError && userData?.user?._id) {
      switch (userData.user.role) {
        case 'manager':
          router.replace('/dashboard/property-manager'); 
          break;
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        default:
          router.replace('/unauthorized');
      }
    }
  }, [isLoading, isError, userData, router]); 

  if (isLoading) return <Loading />;
  if (isError || !userData?.user?._id) return <Unauthorized />;

  return null;
}
