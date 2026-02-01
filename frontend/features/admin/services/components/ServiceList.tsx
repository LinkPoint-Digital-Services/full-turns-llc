import React from "react";
import { Service, Item } from "@/features/manager/components/serviceData";
import { ServiceCard } from "./ServiceCard";

interface ServiceListProps {
  services: Service[];
  items: Item[];
  openServiceId: string | null;
  onToggleService: (serviceId: string) => void;
  onEditService: (service: Service) => void;
  onDeleteService: (serviceId: string) => void;
  onAddItem: (serviceId: string) => void;
  onEditItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
}

export function ServiceList({
  services,
  items,
  openServiceId,
  onToggleService,
  onEditService,
  onDeleteService,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: ServiceListProps) {
  const getItemsByService = (serviceId: string): Item[] =>
    items.filter((item) => item.serviceId === serviceId);

  if (services.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium mb-2">No services yet</p>
        <p className="text-sm">Click &quot;Add Service&quot; to create your first service category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.map((service) => {
        const serviceItems = getItemsByService(service._id);
        const isOpen = openServiceId === service._id;

        return (
          <ServiceCard
            key={service._id}
            service={service}
            items={serviceItems}
            isOpen={isOpen}
            onToggle={() => onToggleService(service._id)}
            onEdit={() => onEditService(service)}
            onDelete={() => onDeleteService(service._id)}
            onAddItem={() => onAddItem(service._id)}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        );
      })}
    </div>
  );
}
