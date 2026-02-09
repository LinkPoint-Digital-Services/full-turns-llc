"use client";

import {ArrowLeft} from "lucide-react";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useMe} from "@/features/auth/hooks/useMe";
import LoginForm from "@/features/auth/components/LoginForm";
import bg from "@/public/assets/images/homepage/auth-bg.jpg";
import roombg from "@/public/assets/images/contact/living-room.png";
import Link from "next/link";
import stroke from "@/public/assets/images/about-us/about-us-paintstroke.png";
import Image from "next/image";

export default function LoginPage() {
  const {data: userData, isLoading, isError} = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isError && userData?.user?._id) {
      router.push(`/dashboard`);
    }
  }, [isLoading, isError, userData, router]);

  return (
    <main className="relative min-h-screen w-full bg-[#262626] text-white flex flex-col lg:flex-row overflow-hidden">
      <div className="absolute bottom-20 md:-bottom-22 -left-20 w-[90%] md:w-[65%] lg:w-[17%]">
        <Image
          className="w-full"
          src={roombg}
          width={0}
          height={0}
          alt={"Isometric Room"}
        ></Image>
      </div>
      {/* IMAGE / HERO */}
      <section className="relative w-full lg:w-[60%] h-[20vh] lg:h-auto overflow-hidden order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: `url(${bg.src})`}}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Desktop-only content */}
        <div className="relative z-10 hidden lg:flex h-full items-center justify-center px-10 text-center">
          <div className="max-w-lg space-y-4">
            <h2 className="text-4xl font-bold">
              Welcome to <span className="text-[#eaa918]">FULL TURNS LLC</span>
            </h2>

            <p className="text-gray-200 text-lg">
              We provide complete unit turnover services that get properties
              clean, repaired, and rent-ready — on time and without hassle.
            </p>
          </div>
        </div>
      </section>

      {/* LOGIN */}
      <section className="relative w-full lg:w-[40%] flex items-start lg:items-center justify-center order-2 lg:order-1 h-full min-h-screen">
        <Link
          href="/"
          className="hidden lg:flex absolute top-4 left-4 lg:top-8 lg:left-8 z-30 text-white hover:text-[#eaa918] transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="sr-only">Back to Home</span>
        </Link>
        {/* Form area — SAME BG AS SECTION */}
        <div
          className="
            relative w-full
            bg-[#262626]
            lg:bg-transparent
            px-6 pt-10 md:px-6 lg:px-15 xl:px-20
            lg:max-w-[38rem]
            -mt-24 lg:mt-0
            z-20

            /* Rounded top border effect */
            rounded-t-4xl lg:rounded-none
            border-none

            /* ---- LoginForm overrides ---- */
            [&_label]:text-white
            [&_input]:bg-white
            [&_input]:text-black
            [&_input::placeholder]:text-gray-400
          "
        >
          <div className="relative inline-block mb-10">
            {/* Brush stroke background */}
            <div className={`absolute flex items-center justify-center`}>
              <Image src={stroke} alt="Brush stroke" />
            </div>

            {/* Text on top */}
            <h2 className="relative text-3xl px-3 top-1 whitespace-nowrap md:text-4xl md:px-5 font-medium text-white text-center">
              Log in to your account
            </h2>
          </div>

          <p className="text-sm text-gray-300 mb-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#eaa918] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
