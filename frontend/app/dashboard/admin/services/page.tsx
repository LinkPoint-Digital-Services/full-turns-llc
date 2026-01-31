"use client";

import React, { JSX, useState } from "react";
import { ChevronDown, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemModal } from "@/features/admin/components/ItemModal";
import { ServiceModal } from "@/features/admin/components/ServiceModal";
import { useServices } from "@/features/manager/components/ServicesContext";
import { Service, Item } from "@/features/manager/components/serviceData";

export default function ServicesPage(): JSX.Element {
  const { 
    services, 
    items, 
    addService, 
    updateService, 
    deleteService, 
    addItem, 
    updateItem, 
    deleteItem 
  } = useServices();
  
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const [serviceModal, setServiceModal] = useState<Service | null>(null);
  const [itemModal, setItemModal] = useState<Item | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [isNewService, setIsNewService] = useState(false);

  const getItemsByService = (id: string): Item[] =>
    items.filter((i) => i.serviceId === id);

  const handleSaveService = (service: Service) => {
    if (isNewService) {
      addService(service);
    } else {
      updateService(service);
    }
    setServiceModal(null);
    setIsNewService(false);
  };

  const handleDeleteService = (id: string) => {
    if (!confirm("Delete service and all items?")) return;
    deleteService(id);
  };

  const handleSaveItem = (item: Item) => {
    if (isNewItem) {
      addItem(item);
    } else {
      updateItem(item);
    }
    setItemModal(null);
    setIsNewItem(false);
  };

  const handleDeleteItem = (id: string) => {
    if (!confirm("Delete item?")) return;
    deleteItem(id);
  };

  const openNewServiceModal = () => {
    setServiceModal({
      _id: `service_${crypto.randomUUID()}`,
      serviceName: "",
      icon: "Hammer",
    });
    setIsNewService(true);
  };

  const openNewItemModal = (serviceId: string) => {
    setItemModal({
      itemId: `item_${crypto.randomUUID()}`,
      name: "",
      icon: "Hammer",
      serviceId: serviceId,
      basePrice: 0,
      measurement: "fixed",
      addOns: [],
      allowCustomDetails: false,
    });
    setIsNewItem(true);
  };

  const openEditItemModal = (item: Item) => {
    setItemModal(item);
    setIsNewItem(false);
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Services</h1>
        <Button onClick={openNewServiceModal}>
          <Plus size={16} /> Add Service
        </Button>
      </div>

      {services.map((service) => {
        const open = openServiceId === service._id;
        const serviceItems = getItemsByService(service._id);

        return (
          <Card key={service._id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <button
                onClick={() => setOpenServiceId(open ? null : service._id)}
                className="flex gap-2 items-center"
              >
                <ChevronDown
                  className={`transition ${open && "rotate-180"}`}
                  size={16}
                />
                <CardTitle className="text-base">
                  {service.serviceName}
                </CardTitle>
              </button>

              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setServiceModal(service);
                    setIsNewService(false);
                  }}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleDeleteService(service._id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardHeader>

            {open && (
              <CardContent className="space-y-3">
                <Button
                  variant="link"
                  className="px-0 text-primary"
                  onClick={() => openNewItemModal(service._id)}
                >
                  <Plus size={14} /> Add Item
                </Button>

                {serviceItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex justify-between border rounded-lg p-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.basePrice} / {item.measurement}
                      </p>
                      {item.addOns && item.addOns.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.addOns.length} add-ons
                        </p>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEditItemModal(item)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDeleteItem(item.itemId)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        );
      })}

      {serviceModal && (
        <ServiceModal
          service={serviceModal}
          onSave={handleSaveService}
          onClose={() => setServiceModal(null)}
        />
      )}

      {itemModal && (
        <ItemModal
          item={itemModal}
          onSave={handleSaveItem}
          onClose={() => setItemModal(null)}
        />
      )}
    </div>
  );
}
