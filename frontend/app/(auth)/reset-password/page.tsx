"use client";

import React, {useEffect} from "react";
import {useForgotPassword} from "@/stores/auth/password-recovery";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useAppMutation} from "@/features/shared/hooks/useAppMutation";
import {authClient} from "@/features/auth/services/authClient";
import AuthInputField from "@/features/auth/components/AuthInputField";
import {Button} from "@/components/ui/button";
import {useAuthForm} from "@/features/auth/hooks/useAuthForm";
import bg from "@/public/assets/images/homepage/auth-bg.jpg";
import stroke from "@/public/assets/images/about-us/about-us-paintstroke.png";
import roombg from "@/public/assets/images/contact/living-room.png";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  const {fields, updateField, passwordToggle, confirmPasswordToggle} =
    useAuthForm();
  const {email} = useForgotPassword();
  const router = useRouter();

  useEffect(() => {
    if (!email) router.replace("/forgot-password");
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fields.newPassword !== fields.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      email_address: email,
      type: "newPassword",
      newPassword: fields.newPassword,
    };

    mutation.mutate(payload);
  };

  const mutation = useAppMutation({
    mutationFn: authClient.verifyCode,
    onSuccessRedirect: "/login",
    successMessage: "New password set successfully",
    errorMessage: "Resetting password failed. Please try again.",
  });

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

      {/* RESET PASSWORD */}
      <section className="relative z-10 w-full lg:w-[40%] flex items-start lg:items-center justify-center order-2 lg:order-1 h-full min-h-screen">
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
              Reset your password
            </h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <AuthInputField
              label="New Password"
              htmlFor="new-password"
              id="new-password"
              type="password"
              value={fields.newPassword || ""}
              onChange={(e) => updateField("newPassword", e.target.value)}
              placeholder="Enter your new password"
              showPassword={passwordToggle.showPassword}
              onTogglePassword={() =>
                passwordToggle.setShowPassword((prev) => !prev)
              }
            />
            <AuthInputField
              label="Confirm New Password"
              htmlFor="confirm-password"
              id="confirm-password"
              type="password"
              value={fields.confirm_password || ""}
              onChange={(e) => updateField("confirm_password", e.target.value)}
              placeholder="Confirm your new password"
              showPassword={confirmPasswordToggle.confirmPassword}
              onTogglePassword={() =>
                confirmPasswordToggle.setConfirmPassword((prev) => !prev)
              }
            />

            <Button
              disabled={mutation.isPending}
              type="submit"
              className="w-full"
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>

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
