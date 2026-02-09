"use client";

import React, {useState, FormEvent} from "react";
import ForgotPassword from "@/features/auth/components/ForgotPassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {authClient} from "@/features/auth/services/authClient";
import {useAppMutation} from "@/features/shared/hooks/useAppMutation";
import {Button} from "@/components/ui/button";
import {useForgotPassword} from "@/stores/auth/password-recovery";
import bg from "@/public/assets/images/homepage/auth-bg.jpg";
import stroke from "@/public/assets/images/about-us/about-us-paintstroke.png";
import roombg from "@/public/assets/images/contact/living-room.png";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const {email, setUser: setEmail} = useForgotPassword();
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState("");

  const onSubmitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    VerifyEmailMutation.mutate({email_address: email.toLowerCase().trim()});
  };

  const VerifyEmailMutation = useAppMutation({
    mutationFn: authClient.verifyEmail,
    successMessage: "Check your email for code.",
    errorMessage: "Invalid credentials",
    onSuccessExtra: () => {
      setIsSent(true);
      setIsVerified(true);
    },
  });

  const onSubmitOTP = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {email_address: email, type: "verify_code", code};
    VerifyCodeMutation.mutate(payload);
  };

  const VerifyCodeMutation = useAppMutation({
    mutationFn: authClient.verifyCode,
    onSuccessRedirect: "/reset-password",
    successMessage: "Code verified successfully",
    errorMessage: "Invalid code",
  });

  return (
    <main className="relative min-h-screen w-full bg-[#262626] text-white flex flex-col lg:flex-row">
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
      <section className="relative z-0 w-full lg:w-[60%] h-[20vh] lg:h-auto overflow-hidden order-1 lg:order-2">
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

      {/* FORGOT PASSWORD */}
      <section className="relative z-10 w-full lg:w-[40%] flex items-start lg:items-center justify-center order-2 lg:order-1 h-full min-h-screen overflow-hidden">
        <div className="absolute -bottom-24 -left-24 z-10 w-64 md:w-96"></div>
        <div
          className="
            relative w-full
            bg-[#1a1a1a] md:bg-transparent
            px-6 pt-10 md:px-6 lg:px-15 xl:px-20
            lg:max-w-[38rem]
            -mt-24 lg:mt-0
            z-20
            rounded-t-4xl lg:rounded-none
            border-none
            [&_label]:text-white
            [&_input]:bg-white
            [&_input]:text-black
            [&_input::placeholder]:text-gray-400
          "
        >
          <div className="relative inline-block mb-10">
            <div className="absolute flex items-center justify-center">
              <Image src={stroke} alt="Brush stroke" />
            </div>
            <h2 className="relative text-3xl px-3 top-1 whitespace-nowrap md:text-4xl md:px-5 font-medium text-white text-center">
              Forgot your password
            </h2>
          </div>

          {isVerified && isSent ? (
            <form onSubmit={onSubmitOTP} className="space-y-6">
              <InputOTP maxLength={6} onComplete={(value) => setCode(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={VerifyCodeMutation.isPending}
              >
                {VerifyCodeMutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          ) : (
            <ForgotPassword
              email={email}
              setEmail={setEmail}
              onSubmit={onSubmitEmail}
              isSubmitting={VerifyEmailMutation.isPending}
            />
          )}

          <p className="text-sm text-gray-300 mt-6 text-center">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-[#eaa918] hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
