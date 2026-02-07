'use client';

import {useEffect} from 'react';
import AOS from 'aos';
import Hero from '@/features/home/components/Hero';
import HomepageHeader from '@/components/layout/HomepageHeader';
import Footer from '@/components/layout/Footer';
import Services from '@/features/home/components/Services';
import Stats from '@/features/home/components/Stats';
import AboutUs from '@/features/home/components/AboutUs';
import Blogs from '@/features/home/components/Blogs';
import Contact from '@/features/home/components/Contact';

export default function HomepageClient() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      offset: 200
    });
    // Refresh in case new elements are added dynamically later
    AOS.refresh();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#1a1a1a]">
      <HomepageHeader />
      <Hero />
      <Services />
      <Stats />
      <AboutUs />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}
