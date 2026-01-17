'use client';

import React from 'react';
import InputField from './AuthInputField';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {FormEvent} from 'react';
import {useAuthForm} from '../hooks/useAuthForm';
import {usePasswordToggle} from '../hooks/usePasswordToggle';
import {useAppMutation} from '@/features/shared/hooks/useAppMutation';
import {authClient} from '../services/authClient';

export default function SignupForm() {
  const {fields, updateField} = useAuthForm();
  const passwordToggle = usePasswordToggle();
  const [accountType, setAccountType] = React.useState('');

  const mutation = useAppMutation({
    mutationFn: authClient.signup,
    onSuccessRedirect: '/dashboard',
    successMessage: 'Signup successful!',
    errorMessage: 'Signup failed. Please try again.'
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // payload and validation logic here
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          htmlFor="firstName"
          id="firstName"
          type="text"
          value={fields.first_name || ''}
          onChange={e => updateField('first_name', e.target.value)}
          placeholder="John"
        />
        <InputField
          label="Last Name"
          htmlFor="lastName"
          id="lastName"
          type="text"
          value={fields.last_name || ''}
          onChange={e => updateField('last_name', e.target.value)}
          placeholder="Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Account Type</label>
        <Select value={accountType} onValueChange={setAccountType}>
          <SelectTrigger id="accountType">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solo">Solo</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <InputField
        label="Email Address"
        htmlFor="email"
        id="email"
        type="email"
        value={fields.email_address}
        onChange={e => updateField('email_address', e.target.value)}
        placeholder="your.email@example.com"
      />

      <InputField
        label="Contact Number"
        htmlFor="contactNumber"
        id="contactNumber"
        type="tel"
        value={fields.contact_no || ''}
        onChange={e => updateField('contact_no', e.target.value)}
        placeholder="+1 (555) 000-0000"
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

      <InputField
        label="Confirm Password"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type="password"
        value={fields.confirm_password || ''}
        onChange={e => updateField('confirm_password', e.target.value)}
        placeholder="Confirm your password"
        showPassword={passwordToggle.showPassword}
        onTogglePassword={() => passwordToggle.setShowPassword(prev => !prev)}
      />

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-orange-500 hover:bg-orange-600"
      >
        {mutation.isPending ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}
