"use client";

import Image from "next/image";
import Link from "next/link";
import {Phone, Mail} from "lucide-react";

export default function Footer() {
  const generalLinks = [
    {href: "#home", label: "Home"},
    {href: "#services", label: "Services"},
    {href: "#about-us", label: "About Us"},
    {href: "#blogs", label: "Blogs"},
    {href: "#contacts", label: "Contact Us"},
  ];

  return (
    <footer className="bg-primary">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start justify-center mb-6 sm:mb-0">
            <Link href="/" className="mb-4 transition-opacity hover:opacity-80">
              <Image
                src="/assets/images/homepage/logo.png"
                alt="Full Turns LLC Logo"
                width={180}
                height={50}
                priority
                className="h-auto w-auto max-w-xs"
              />
            </Link>
          </div>

          {/* General Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-base md:text-lg font-semibold text-[#0C0A0C] mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#0C0A0C] rounded-full"></span>
              General
            </h3>
            <ul className="space-y-2 md:space-y-3 text-center sm:text-left">
              {generalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#0C0A0C]/80 hover:text-[#0C0A0C] transition-colors duration-200 text-xs md:text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start justify-center gap-3">
            <div className="flex items-center gap-3 bg-primary px-4 py-2 sm:px-5 sm:py-3 rounded-full w-fit">
              <Phone className="w-5 h-5 text-black fill-black stroke-0" />
              <span className="font-medium text-black text-sm sm:text-base">
                +1 (443) 683-9520
              </span>
            </div>

            <div className="flex items-center gap-3 bg-primary px-4 py-2 sm:px-5 sm:py-3 rounded-full w-fit">
              <Phone className="w-5 h-5 text-black fill-black stroke-0" />
              <span className="font-medium text-black text-sm sm:text-base">
                (443) 481-0809
              </span>
            </div>

            <div className="flex items-center gap-3 bg-primary px-4 py-2 sm:px-5 sm:py-3 rounded-full w-fit">
              <Mail className="w-5 h-5 text-black" />
              <span className="font-medium text-black text-sm sm:text-base">
                david@fullturns.com
              </span>
            </div>

            <div className="flex items-center gap-3 bg-primary px-4 py-2 sm:px-5 sm:py-3 rounded-full w-fit">
              <Mail className="w-5 h-5 text-black" />
              <span className="font-medium text-black text-sm sm:text-base">
                fullturnsllc@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
