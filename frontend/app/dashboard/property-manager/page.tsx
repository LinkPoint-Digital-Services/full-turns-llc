"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useMe} from "@/features/auth/hooks/useMe";
import Loading from "@/app/loading";
import DashboardHeader from "@/components/layout/DashboardHeader";
import {Button} from "@/components/ui/button";
import OrdersPage from "./orders/Orders";
import MyOrdersPage from "./my-orders/myOrders";
import SettingsPage from "./settings/Settings";

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

      <main className="min-h-screen bg-[#121212] text-white">
        <div>
          {/* Content Container */}
          <div className="bg-white text-[#1c1c1c] p-2 md:p-8">
            {/* Tabs */}
            <div className=" md:fixed top-23 mt-20 md:mt-0 left-0 right-0 z-20 bg-white px-6 md:px-8 py-9 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 items-stretch sm:items-center">
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
            <div className="md:pt-40 h-screen">
              {activeTab === "orders" && <OrdersPage />}
              {activeTab === "my-orders" && <MyOrdersPage />}
              {activeTab === "settings" && <SettingsPage />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
