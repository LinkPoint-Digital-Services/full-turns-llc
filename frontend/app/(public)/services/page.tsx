import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Explore maintenance, repair, and renovation services from Full Turns LLC.',
  path: '/services'
});

export default function page() {
  return (
    <div>page</div>
  )
}
