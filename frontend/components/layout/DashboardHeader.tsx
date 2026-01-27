'use client';

import React from 'react';
import {authClient} from '@/features/auth/services/authClient';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {toast} from 'sonner';
import {useQueryClient} from '@tanstack/react-query';
import {Button} from '../ui/button';
import Image from 'next/image';
import { useMe } from '@/features/auth/hooks/useMe';

export default function DashboardHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData } = useMe();


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
    <header className="bg-primary">
      <div className="flex items-center justify-between p-4 container mx-auto">
        <Image
          src="/assets/images/homepage/logo_for_orange.png"
          alt="Full Turns LLC Logo"
          width={150}
          height={150}
          className="object-contain"
          priority
        />

        <div className="flex items-center gap-4">
          <h4>{userData?.user.role == "admin" ? "Admin" : "Manager"}</h4>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-md border-2 border-[#1c1c1c] bg-transparent hover:bg-[#1c1c1c] hover:text-primary text-[#1c1c1c] transition"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
