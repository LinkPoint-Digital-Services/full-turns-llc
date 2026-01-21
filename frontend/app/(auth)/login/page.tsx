'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation'; // App Router
import {useMe} from '@/features/auth/hooks/useMe';
import LoginForm from '@/features/auth/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  const {data: userData, isLoading, isError} = useMe();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (!isLoading && !isError && userData?.user?._id) {
      router.push(`/dashboard`);
    }
  }, [isLoading, isError, userData, router]);

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Log in to your account</h1>
        <h2>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </h2>
        <LoginForm />
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h1>FULL TURN LLC</h1>
      </div>
    </main>
  );
}
