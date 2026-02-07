import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Learn about Full Turns LLC and our commitment to dependable repairs and renovations.',
  path: '/about'
});

export default function page() {
  return (
    <div>page</div>
  )
}
