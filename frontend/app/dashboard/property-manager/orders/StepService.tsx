"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  ServiceCategoryList,
  ServiceItemGrid,
  ServiceItemConfigModal,
} from "@/features/manager/components";
import type { Item } from "@/features/manager/components";
import {
  services,
  getItemsByServiceId,
} from "@/features/manager/components/serviceData";
import { cn } from "@/lib/utils";

interface StepServiceProps {
  onSelectItem: (item: Item) => void;
  onAddConfiguredItem: (item: {
    serviceId: string;
    name: string;
    price: number;
    details: string;
  }) => void;
}

export const StepService = ({ onSelectItem, onAddConfiguredItem }: StepServiceProps) => {
  // Initialize with the first service ID
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]._id);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedConfigItem, setSelectedConfigItem] = useState<Item | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemSelect = (item: Item) => {
    // If item is 'fixed' measurement (no quantity needed), has no add-ons, and no custom details allowed:
    // Simply select it (triggering the confirmation modal in parent if applicable, or direct add).
    const isSimpleItem = 
      item.measurement === "fixed" && 
      (!item.addOns || item.addOns.length === 0) &&
      !item.allowCustomDetails;

    if (isSimpleItem) {
      onSelectItem(item);
    } else {
      // Otherwise, open configuration modal (for quantity, add-ons, or custom details)
      setSelectedConfigItem(item);
      setConfigModalOpen(true);
    }
  };

  const activeService = services.find(s => s._id === activeServiceId) || services[0];
  const currentItems = getItemsByServiceId(activeServiceId);

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
                {activeService.serviceName}
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
                categories={services}
                activeCategory={activeService.serviceName}
                onCategoryChange={(serviceName) => {
                  const service = services.find(
                    (s) => s.serviceName === serviceName
                  );
                  if (service) {
                    setActiveServiceId(service._id);
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
            categories={services}
            activeCategory={activeService.serviceName}
            onCategoryChange={(serviceName) => {
              const service = services.find((s) => s.serviceName === serviceName);
              if (service) {
                setActiveServiceId(service._id);
              }
            }}
          />

          <ServiceItemGrid
            title={activeService.serviceName}
            items={currentItems}
            onItemSelect={handleItemSelect}
          />
        </div>

        {/* Mobile grid below toggle */}
        <div className="mt-3 md:mt-0 md:hidden flex-1">
          <ServiceItemGrid
            title={activeService.serviceName}
            items={currentItems}
            onItemSelect={handleItemSelect}
          />
        </div>
      </div>

      {/* Reusable Configuration Modal */}
      <ServiceItemConfigModal 
        item={selectedConfigItem}
        open={configModalOpen} 
        onOpenChange={setConfigModalOpen} 
        onAddToCart={onAddConfiguredItem}
      />
    </>
  );
};
