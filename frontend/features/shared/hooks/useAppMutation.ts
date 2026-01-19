'use client';

import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';

type MutationOptions<T, R> = {
  mutationFn: (data: T) => Promise<R>;
  onSuccessRedirect?: string | ((data: R) => string);
  successMessage?: string;
  errorMessage?: string;
  resetForm?: () => void;
  onSuccessExtra?: (data: R) => void;
};

export function useAppMutation<T, R>({
  mutationFn,
  onSuccessRedirect,
  successMessage,
  errorMessage,
  resetForm,
  onSuccessExtra
}: MutationOptions<T, R>) {
  const router = useRouter();

  const handleSuccess = (data: R) => {
    if (successMessage) toast.success(successMessage);
    resetForm?.();
    onSuccessExtra?.(data);
    if (onSuccessRedirect) {
      const redirectPath =
        typeof onSuccessRedirect === 'function'
          ? onSuccessRedirect(data)
          : onSuccessRedirect;
      router.push(redirectPath);
    }
  };

  const handleError = (error: AxiosError<{message: string}>) => {
    const errMsg =
      error.response?.data.message ||
      error.message ||
      errorMessage ||
      'An error occurred';
    toast.error(errMsg);
  };

  return useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError
  });
}
