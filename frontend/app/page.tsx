import Hero from '@/features/home/components/Hero';
import HomepageHeader from '@/components/layout/HomepageHeader';
import Footer from '@/components/layout/Footer';
import Services from '@/features/home/components/Services';
import Stats from '@/features/home/components/Stats';
import AboutUs from '@/features/home/components/AboutUs';

export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col bg-[#1a1a1a]'>
      <HomepageHeader />
      <Hero />
      <Services/>
      <Stats/>
      <AboutUs/>
      <Footer />
    </main>
  );
}
