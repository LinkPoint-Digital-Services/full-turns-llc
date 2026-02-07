import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

type BlogPageProps = {
  params: {
    slug: string;
  };
};

function formatSlugTitle(slug: string) {
  const spaced = slug.replace(/-/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const title = formatSlugTitle(params.slug);
  return buildMetadata({
    title,
    description:
      'Read the latest updates, tips, and project insights from Full Turns LLC.',
    path: `/blogs/${params.slug}`
  });
}

export default function page() {
  return (
    <div>page</div>
  )
}
