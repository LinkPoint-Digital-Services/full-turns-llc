import type { Metadata } from 'next';
import HomepageClient from './homepage-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  description:
    'Full Turns LLC provides unit turnover services including cleaning, painting, maintenance, and renovations for property managers and homeowners.',
  path: '/'
});

export default function HomePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: 'Full Turns LLC',
      url: 'https://www.fullturnsllc.com/',
      telephone: '(443) 481-0809',
      areaServed: 'Baltimore County, Maryland, USA',
      serviceType: [
        'Unit Turnover',
        'Painting',
        'Maintenance',
        'Cleaning',
        'Renovation',
        'Reglazing'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Full Turns LLC',
      url: 'https://www.fullturnsllc.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.fullturnsllc.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only">
        <h1>Full Turns LLC Renovation and Unit Turnover Services</h1>
        <p>
          Full Turns LLC provides unit turnover, renovation, maintenance,
          cleaning, painting, and reglazing services for property managers and
          homeowners in Baltimore County, Maryland.
        </p>
        <a href="/services">View all services</a>
      </div>
      <HomepageClient />
    </>
  );
}
