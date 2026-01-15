import React from 'react';
import LoginForm from '@/features/auth/components/LoginForm';

/*
  Basic input only please ignore styles and other components for now
  -Please add styles later lucky-chan
*/

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Log in to your account</h1>
      <h2>
        Don&apos;t have an account?{' '}
        <span className="text-orange-500">Sign Up</span>
      </h2>
      <LoginForm />
    </div>
  );
}
