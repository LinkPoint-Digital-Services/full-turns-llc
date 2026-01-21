'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const generalLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
  ]

  // const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Logo Section - Left Column */}
          <div className="flex flex-col items-center sm:items-start justify-center">
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

          {/* General Links - Middle Column */}
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

          {/* Blank Column - Right Side */}
          <div className="hidden lg:block">
            {/* This column is left blank for you to edit */}
          </div>
        </div>
      </div>
    </footer>
  )
}
