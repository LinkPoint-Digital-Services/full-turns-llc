'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/assets/images/homepage/logo.png'
import { Button } from '../ui/button'


export default function HomepageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about-us', label: 'About Us' },
    { href: '#blogs', label: 'Blogs' },
    { href: '#contacts', label: 'Contact Us' },
  ]

  return (
    <header className="w-full text-white py-3 md:py-4 backdrop-blur-md bg-black/20 fixed z-50 md:px-10">
      <div className="container mx-auto flex items-center justify-between">
        
        <Link href={"/"} className="shrink-0">
          <Image 
            src={logo} 
            alt={"logo"} 
            priority
          ></Image>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="hover:text-gray-300 transition-colors text-sm lg:text-base font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Button */}
        <Button variant={"default"} className="hidden md:block">
          Order Now
        </Button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span 
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span 
            className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span 
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black/40 border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gray-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button 
              variant={"default"} 
              className="w-full mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Order Now
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
