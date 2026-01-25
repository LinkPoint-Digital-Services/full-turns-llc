'use client';

import Image from 'next/image';
import Link from 'next/link';
import {Phone, Mail} from 'lucide-react';
import toolboxman from '@/public/assets/images/contact/toolboxman.png';

export default function Footer() {
  const generalLinks = [
    {href: '#home', label: 'Home'},
    {href: '#services', label: 'Services'},
    {href: '#about-us', label: 'About Us'},
    {href: '#blogs', label: 'Blogs'},
    {href: '#contacts', label: 'Contact Us'}
  ];

  return (
    <footer className="bg-primary overflow-hidden relative">
      <div className="container mx-auto px-10 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start justify-center mb-6 sm:mb-0 text-center sm:text-left">
            <Link href="/" className="mb-4 transition-opacity hover:opacity-80">
              <Image
                src="/assets/images/homepage/logo_for_orange.png"
                alt="Full Turns LLC Logo"
                width={270}
                height={50}
                priority
                className="block"
              />
            </Link>
            {/* Short Description */}
            <p className="lg:text-base text-[#0C0A0C]/80 max-w-xs sm:max-w-sm">
              We specialize in seamless unit turnovers, ensuring quality service
              and reliable results.
            </p>
          </div>

          {/* General Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-[#0C0A0C] mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#0C0A0C] rounded-full"></span>
              General
            </h3>
            <ul className="space-y-2 md:space-y-3 text-left">
              {generalLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#0C0A0C]/80 hover:text-[#0C0A0C] transition-colors duration-200 text-[18px] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Toolboxman Image */}
          <Image
            src={toolboxman}
            className="absolute right-20 hidden md:block z-10"
            alt="man with toolbox"
            width={180}
          />

          {/* Contact Info */}
          <div className="z-20">
            <h3 className="text-2xl font-semibold text-[#0C0A0C] mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#0C0A0C] rounded-full"></span>
              Contacts
            </h3>
            <div className="flex flex-col items-start justify-center gap-3">
              <div className="flex items-center gap-3 bg-primary/20 rounded-full w-fit backdrop-blur-md">
                <Phone className="w-5 h-5 text-black fill-black stroke-0" />
                <span className="font-medium text-black text-[18px]">
                  +1 (443) 683-9520
                </span>
              </div>

              <div className="flex items-center gap-3 bg-primary/20 backdrop-blur-md rounded-full w-fit">
                <Phone className="w-5 h-5 text-black fill-black stroke-0" />
                <span className="font-medium text-black text-[18px]">
                  (443) 481-0809
                </span>
              </div>

              <div className="flex items-center gap-3 bg-primary/20 backdrop-blur-md rounded-full w-fit">
                <Mail className="w-5 h-5 text-black" />
                <span className="font-medium text-black text-[18px]">
                  david@fullturns.com
                </span>
              </div>

              <div className="flex items-center gap-3 bg-primary/20 backdrop-blur-md rounded-full w-fit">
                <Mail className="w-5 h-5 text-black" />
                <span className="font-medium text-black text-[18px]">
                  fullturnsllc@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-black/20 pt-4 text-center sm:text-left">
          <p className="text-xs md:text-sm text-[#0C0A0C]/70">
            © {new Date().getFullYear()} Full Turns LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
