import type {ReactNode} from 'react';
import {ServicesProvider} from '@/features/manager/components/ServicesContext';

export default function PropertyManagerLayout({
  children
}: {
  children: ReactNode;
}) {
  return <ServicesProvider>{children}</ServicesProvider>;
}
