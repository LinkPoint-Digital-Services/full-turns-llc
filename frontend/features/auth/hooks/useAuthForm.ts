'use client';

import {useState} from 'react';
import {AuthFormFields} from '../types/authForm.types';

export function useAuthForm() {
  const initialState: AuthFormFields = {
    first_name: '',
    last_name: '',
    email_address: '',
    contact_no: '',
    password: '',
    confirm_password: '',
    role: 'manager',
    account_type: 'solo',
    company_name: '',
    verificationCode: ''
  };

  const [fields, setFields] = useState<AuthFormFields>(initialState);

  const updateField = (key: keyof AuthFormFields, value: string) => {
    setFields(prev => ({...prev, [key]: value}));
  };

  const resetForm = () => setFields(initialState);

  return {fields, updateField, resetForm};
}
