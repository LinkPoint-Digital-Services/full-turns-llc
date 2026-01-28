"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  ServiceCategoryList,
  ServiceItemGrid,
  PaintingConfigModal,
  PunchOutConfigModal,
} from "@/features/manager/components";
import {
  serviceCategories,
  getServicesByCategory,
  ServiceCategoryKey,
  ServiceItem,
} from "@/features/manager/components/serviceData";
import { cn } from "@/lib/utils";

interface StepServiceProps {
  onSelectItem: (item: ServiceItem) => void;
  onAddConfiguredItem: (item: {
    serviceId: string;
    name: string;
    price: number;
    details: string;
  }) => void;
}

export const StepService = ({ onSelectItem, onAddConfiguredItem }: StepServiceProps) => {
  const [activeService, setActiveService] = useState<ServiceCategoryKey>("refinish");
  const [paintModalOpen, setPaintModalOpen] = useState(false);
  const [punchOutModalOpen, setPunchOutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemSelect = (item: ServiceItem) => {
    // Check if item requires configuration modal
    if (item.id === "painting_apartments") {
      setPaintModalOpen(true);
    } else if (item.id === "maintenance_punchout") {
      setPunchOutModalOpen(true);
    } else {
      // For straightforward services, ask parent to confirm add to cart
      onSelectItem(item);
    }
  };

  const categories = serviceCategories.map((cat) => ({
    name: cat.displayName,
    icon: cat.icon,
  }));

  const currentItems = getServicesByCategory(activeService);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 min-h-[calc(100vh-13rem)] md:min-h-[calc(100vh-16rem)] mt-2 md:mt-6">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((open) => !open)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="font-medium">
                {serviceCategories.find((c) => c.id === activeService)?.displayName ||
                  "Service Categories"}
              </span>
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                isSidebarOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </button>

          {isSidebarOpen && (
            <div className="mt-2 border border-gray-100 rounded-lg bg-white shadow-sm">
              <ServiceCategoryList
                categories={categories}
                activeCategory={
                  serviceCategories.find((c) => c.id === activeService)?.displayName || ""
                }
                onCategoryChange={(categoryName) => {
                  const category = serviceCategories.find(
                    (c) => c.displayName === categoryName
                  );
                  if (category) {
                    setActiveService(category.id);
                  }
                  setIsSidebarOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Desktop sidebar + grid layout */}
        <div className="hidden md:flex md:flex-row md:gap-6 md:flex-1">
          <ServiceCategoryList
            categories={categories}
            activeCategory={
              serviceCategories.find((c) => c.id === activeService)?.displayName || ""
            }
            onCategoryChange={(categoryName) => {
              const category = serviceCategories.find((c) => c.displayName === categoryName);
              if (category) {
                setActiveService(category.id);
              }
            }}
          />

          <ServiceItemGrid
            title={serviceCategories.find((c) => c.id === activeService)?.displayName || ""}
            items={currentItems}
            onItemSelect={handleItemSelect}
          />
        </div>

        {/* Mobile grid below toggle */}
        <div className="mt-3 md:mt-0 md:hidden flex-1">
          <ServiceItemGrid
            title={serviceCategories.find((c) => c.id === activeService)?.displayName || ""}
            items={currentItems}
            onItemSelect={handleItemSelect}
          />
        </div>
      </div>

      {/* Configuration Modals */}
      <PaintingConfigModal
        open={paintModalOpen}
        onOpenChange={setPaintModalOpen}
        onAddToCart={onAddConfiguredItem}
      />
      <PunchOutConfigModal open={punchOutModalOpen} onOpenChange={setPunchOutModalOpen} />
    </>
  );
};
