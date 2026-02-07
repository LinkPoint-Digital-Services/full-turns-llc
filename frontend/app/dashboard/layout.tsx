import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {ServicesProvider} from '@/features/manager/components/ServicesContext';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function DashboardLayout({children}: {children: ReactNode}) {
  return <ServicesProvider>{children}</ServicesProvider>;
}
