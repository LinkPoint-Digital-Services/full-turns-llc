"use client";

import { useState, useEffect } from "react";
import {
  ServiceCategoryList,
  ServiceItemGrid,
  ServiceItemConfigModal,
} from "@/features/manager/components";
import type { Item } from "@/features/manager/components";
import { useServices } from "@/features/manager/components/ServicesContext";

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
  const { services, items, loading } = useServices();

  if (loading) {
     return <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
       <p className="text-gray-500">Loading services...</p>
     </div>;
  }
  
  // Use controlled state if provided, otherwise use internal state
  // Fallback to first service if list is empty (though unlikely with initial data)
  const initialServiceId = services.length > 0 ? services[0]._id : "";
  const [internalActiveServiceId, setInternalActiveServiceId] = useState<string>(initialServiceId);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedConfigItem, setSelectedConfigItem] = useState<Item | null>(null);

  const activeServiceId = controlledActiveServiceId || internalActiveServiceId;
  const setActiveServiceId = onServiceChange || setInternalActiveServiceId;

  // Set initial active service once services are loaded
  useEffect(() => {
    if (!activeServiceId && services.length > 0) {
      setActiveServiceId(services[0]._id);
    }
  }, [services, activeServiceId, setActiveServiceId]);

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
  const currentItems = items.filter(i => i.serviceId === activeServiceId);

  if (!activeService) return <div>No services available</div>;

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
