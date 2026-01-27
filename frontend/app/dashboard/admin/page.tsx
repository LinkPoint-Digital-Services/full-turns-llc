"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useMe} from "@/features/auth/hooks/useMe";
import Loading from "@/app/loading";
import DashboardHeader from "@/components/layout/DashboardHeader";
import {Button} from "@/components/ui/button";
import BuffersPage from "./buffers/page";
import BlogsPage from "./blogs/page";
import ServicesPage from "./services/page";
import BackupPage from "./backup/page";

export default function AdminPage() {
  const router = useRouter();
  const {data: userData, isLoading, isError} = useMe();
  type AdminTab = "buffers" | "blogs" | "services" | "backup" | null;
  const [activeTab, setActiveTab] = useState<AdminTab>("buffers");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) router.replace("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading, router]);

  useEffect(() => {
    if (isLoading) return;
    if (!userData?.user) return;

    const role = userData.user.role;

    if (role === "manager") {
      router.replace("/dashboard/property-manager");
      return;
    }

    if (isError || role !== "admin") {
      router.replace("/login");
      return;
    }
  }, [isLoading, isError, userData, router]);

  if (isLoading) return <Loading />;
  if (!userData?.user) return <Loading />;

  return (
    <>
      <DashboardHeader />

      <main className="min-h-screen bg-[#121212] text-white px-6 py-10">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/homepage/logo_for_orange.png"
              alt="Full Turns LLC Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />

            <div>
              <h1 className="text-3xl font-semibold">Welcome!</h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage property managers, blogs, services, and data backups
              </p>
            </div>
          </div>

          {/* Tabs (UNCHANGED BEHAVIOR) */}
          <div className="flex gap-4 mt-8 items-center">
            {(
              [
                ["buffers", "Buffers"],
                ["blogs", "Blogs"],
                ["services", "Services"],
                ["backup", "Backup"],
              ] as const
            ).map(([key, label]) => (
              <Button
                key={key}
                variant="default"
                onClick={() => setActiveTab(key)}
                className={`h-9 px-6 rounded-full text-sm transition-all flex-1
                  ${
                    activeTab === key
                      ? "bg-primary text-black"
                      : "bg-[#1c1c1c] text-gray-300 hover:bg-[#1c1c1c]/20"
                  }`}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Content Container */}
          <div className="mt-8 bg-white text-[#1c1c1c] rounded-xl p-8 min-h-[420px]">
            {activeTab === "buffers" && <BuffersPage />}
            {activeTab === "blogs" && <BlogsPage />}
            {activeTab === "services" && <ServicesPage />}
            {activeTab === "backup" && <BackupPage />}
          </div>
        </div>
      </main>
    </>
  );
}
