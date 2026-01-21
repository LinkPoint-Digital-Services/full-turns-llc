'use client';

import React from 'react';
import ForgotPassword from '@/features/auth/components/ForgotPassword';
import {useState} from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';
import {authClient} from '@/features/auth/services/authClient';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {FormEvent} from 'react';
import {Button} from '@/components/ui/button';
import {useForgotPassword} from '@/stores/auth/password-recovery';

export default function ForgotPasswordPage() {
  const {email, setUser: setEmail} = useForgotPassword();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [code, setCode] = useState('');

  const onSubmitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    VerifyEmailMutation.mutate({email_address: email.toLowerCase().trim()});
  };

  const VerifyEmailMutation = useAppMutation({
    mutationFn: authClient.verifyEmail,
    successMessage: 'Check your email for code.',
    errorMessage: 'Invalid credentials',
    onSuccessExtra: () => {
      setIsSent(true);
      setIsVerified(true);
    }
  });

  const onSubmitOTP = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      email_address: email,
      type: 'verify_code',
      code: code
    };

    VerifyCodeMutation.mutate(payload);
  };

  const VerifyCodeMutation = useAppMutation({
    mutationFn: authClient.verifyCode,
    onSuccessRedirect: '/reset-password',
    successMessage: 'Code verified successfully',
    errorMessage: 'Invalid code'
  });

  return (
    <>
      {isVerified && isSent ? (
        <form onSubmit={onSubmitOTP} className="space-y-6">
          <InputOTP maxLength={6} onComplete={value => setCode(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={VerifyCodeMutation.isPending}
          >
            {VerifyCodeMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      ) : (
        <ForgotPassword
          email={email}
          setEmail={setEmail}
          onSubmit={onSubmitEmail}
          isSubmitting={VerifyEmailMutation.isPending}
        />
      )}
    </>
  );
}
