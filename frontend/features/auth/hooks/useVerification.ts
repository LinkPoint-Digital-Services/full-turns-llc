'use client'

import {useState} from 'react';

export function useVerification() {
  const [verifyCode, setVerifyCode] = useState('');

  return {verifyCode, setVerifyCode};
}
