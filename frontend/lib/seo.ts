import type {Metadata} from 'next';

export const siteName = 'Full Turns LLC';
export const siteTagline =
  'From repairs to renovations, quality you can count on.';
export const siteUrl = 'https://www.fullturnsllc.com';
export const ogImage = '/assets/images/homepage/logo_for_darks.png';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  path
}: BuildMetadataInput): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description ?? siteTagline;
  const url = path ?? '/';

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          alt: `${siteName} logo`
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage]
    }
  };
}
