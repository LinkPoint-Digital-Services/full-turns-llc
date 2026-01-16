import React from 'react';
import {User} from '../types/user.types';
import {FormEvent} from 'react';

export default function SignupForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: User = {
      // Populate user fields here
    };
    //payload and validation logic here
  };

  return <div>SignupForm</div>;
}
