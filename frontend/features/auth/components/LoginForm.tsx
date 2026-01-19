'use client';

import React from 'react';
import InputField from './AuthInputField';
import {Button} from '@/components/ui/button';
import {FormEvent} from 'react';
import {useAuthForm} from '../hooks/useAuthForm';
import {usePasswordToggle} from '../hooks/usePasswordToggle';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {authClient} from '../services/authClient';
import {LoginRequest} from '../types/auth.types';

export default function LoginForm() {
  const {fields, updateField} = useAuthForm();
  const passwordToggle = usePasswordToggle();

  const mutation = useAppMutation({
    mutationFn: authClient.login,
    onSuccessRedirect: '/property-manager',
    successMessage: 'Login successful!',
    errorMessage: 'Login failed. Please try again.'
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: LoginRequest = {
      email_address: fields.email_address,
      password: fields.password
    };

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <InputField
        label="Email"
        htmlFor="email"
        id="email"
        type="email"
        value={fields.email_address}
        onChange={e => updateField('email_address', e.target.value)}
        placeholder="your.email@example.com"
      />

      <InputField
        label="Password"
        htmlFor="password"
        id="password"
        type="password"
        value={fields.password}
        onChange={e => updateField('password', e.target.value)}
        placeholder="Enter your password"
        showPassword={passwordToggle.showPassword}
        onTogglePassword={() => passwordToggle.setShowPassword(prev => !prev)}
      />

      <div className="flex justify-end">
        <a
          href="/forgot-password"
          className="text-sm text-[#3e6ef3] underline-offset-2 hover:underline dark:text-white"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
