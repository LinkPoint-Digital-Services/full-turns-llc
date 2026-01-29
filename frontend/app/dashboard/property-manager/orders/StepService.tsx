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
  getIcon,
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
  activeServiceId?: string;
  onServiceChange?: (serviceId: string) => void;
}

export const StepService = ({ 
  onSelectItem, 
  onAddConfiguredItem, 
  activeServiceId: controlledActiveServiceId,
  onServiceChange 
}: StepServiceProps) => {
  // Use controlled state if provided, otherwise use internal state
  const [internalActiveServiceId, setInternalActiveServiceId] = useState<string>(services[0]._id);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedConfigItem, setSelectedConfigItem] = useState<Item | null>(null);

  const activeServiceId = controlledActiveServiceId || internalActiveServiceId;
  const setActiveServiceId = onServiceChange || setInternalActiveServiceId;

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
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 min-h-[calc(100vh-13rem)] md:min-h-[calc(100vh-16rem)] mt-2 md:mt-6 pb-48 md:pb-64">
        {/* Desktop sidebar + grid layout */}
        <div className="hidden md:flex md:flex-row md:gap-6 md:flex-1 md:ml-72">
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

        {/* Mobile grid */}
        <div className="md:hidden flex-1">
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
