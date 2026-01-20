import React from 'react'
import Link from 'next/link'

export default function HomepageHeader() {
  return (
    <header className='bg-white h-16 flex items-center justify-between px-4 shadow-md text-black'>
      <span>Logo</span> {/* Placeholder for logo */}
      <Link href="/login">Order now</Link>
    </header>
  )
}
