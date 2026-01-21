'use client';

import React from 'react';
import {useForgotPassword} from '@/stores/auth/password-recovery';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {authClient} from '@/features/auth/services/authClient';
import AuthInputField from '@/features/auth/components/AuthInputField';
import {Button} from '@/components/ui/button';
import { useAuthForm } from '@/features/auth/hooks/useAuthForm';

export default function ResetPasswordPage() {
  const {fields, updateField, passwordToggle, confirmPasswordToggle} = useAuthForm();
  const {email} = useForgotPassword();
  const router = useRouter();

  useEffect(() => {
    if (!email) router.replace('/forgot-password');
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fields.newPassword !== fields.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    const payload = {
      email_address: email,
      type: 'newPassword',
      newPassword: fields.newPassword
    };

    mutation.mutate(payload);
  };

  const mutation = useAppMutation({
    mutationFn: authClient.verifyCode,
    onSuccessRedirect: '/login',
    successMessage: 'New password set successfully',
    errorMessage: 'Resetting password failed. Please try again.'
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-5">
        <AuthInputField
          label="New Password"
          htmlFor="new-password"
          id="new-password"
          type="password"
          value={fields.newPassword || ''}
          onChange={e => updateField('newPassword', e.target.value)}
          placeholder="Enter your new password"
          showPassword={passwordToggle.showPassword}
          onTogglePassword={() => passwordToggle.setShowPassword(prev => !prev)}
        />
        <AuthInputField
          label="Confirm New Password"
          htmlFor="confirm-password"
          id="confirm-password"
          type="password"
          value={fields.confirm_password || ''}
          onChange={e => updateField('confirm_password', e.target.value)}
          placeholder="Confirm your new password"
          showPassword={confirmPasswordToggle.confirmPassword}
          onTogglePassword={() =>
            confirmPasswordToggle.setConfirmPassword(prev => !prev)
          }
        />

        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
