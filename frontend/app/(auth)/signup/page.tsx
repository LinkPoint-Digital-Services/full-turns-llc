import React from 'react'
import SignupForm from '@/features/auth/components/SignupForm'
import Link from 'next/link'

export default function page() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Log in to your account</h1>
        <h2>
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 underline">Login</Link>
        </h2>
        <SignupForm />
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h1>FULL TURN LLC</h1>
      </div>
    </main>
  )
}
