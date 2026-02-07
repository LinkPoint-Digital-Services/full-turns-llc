import type { Metadata } from 'next';
import HomepageClient from './homepage-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  description: 'From repairs to renovations, quality you can count on.',
  path: '/'
});

export default function HomePage() {
  return <HomepageClient />;
}
