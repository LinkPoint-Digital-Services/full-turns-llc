import {create} from 'zustand'

interface EmailStore {
  email: string;
  setUser: (email: string) => void;
}

export const useForgotPassword = create<EmailStore>((set) => ({
  email: '',
  setUser: (email: string) => set({email: email}),
}));
