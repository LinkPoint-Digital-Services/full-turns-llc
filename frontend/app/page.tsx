import Hero from '@/features/home/components/Hero';
import HomepageHeader from '@/components/layout/HomepageHeader';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col'>
      <HomepageHeader />
      <Hero />
      <Footer />
    </main>
  );
}
