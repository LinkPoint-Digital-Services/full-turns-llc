"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useMe} from "@/features/auth/hooks/useMe";
import Loading from "@/app/loading";
import DashboardHeader from "@/components/layout/DashboardHeader";
import {Button} from "@/components/ui/button";
import OrdersPage from "./orders/page";
import MyOrdersPage from "./my-orders/page";
import SettingsPage from "./settings/page";

export default function ManagerPage() {
  const router = useRouter();
  const {data: userData, isLoading, isError} = useMe();

  type ManagerTab = "orders" | "my-orders" | "settings" | null;
  const [activeTab, setActiveTab] = useState<ManagerTab>("orders");

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

    if (role === "admin") {
      router.replace("/dashboard/admin");
      return;
    }

    if (isError || role !== "manager") {
      router.replace("/login");
      return;
    }
  }, [isError, isLoading, router, userData]);

  if (isLoading) return <Loading />;
  if (!userData?.user) return <Loading />;

  return (
    <>
      <DashboardHeader />

      <main className="min-h-screen pt-40 bg-[#121212] text-white px-6 py-10">
        <div className="container mx-auto">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold">Manager Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage orders, view my orders, and update settings
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 items-stretch sm:items-center">
            {(
              [
                ["orders", "Place Orders"],
                ["my-orders", "My Orders"],
                ["settings", "Settings"],
              ] as const
            ).map(([key, label]) => (
              <Button
                key={key}
                variant="default"
                onClick={() => setActiveTab(key)}
                className={`h-9 px-4 md:px-6 rounded-full text-xs md:text-sm transition-all w-full sm:w-auto
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
          <div className="mt-8 bg-white text-[#1c1c1c] rounded-xl p-8">
            {activeTab === "orders" && <OrdersPage />}
            {activeTab === "my-orders" && <MyOrdersPage />}
            {activeTab === "settings" && <SettingsPage />}
          </div>
        </div>
      </main>
    </>
  );
}
