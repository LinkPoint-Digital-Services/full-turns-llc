import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Read updates, tips, and project insights from Full Turns LLC.',
  path: '/blogs'
});

export default function page() {
  return (
    <div>page</div>
  )
}
