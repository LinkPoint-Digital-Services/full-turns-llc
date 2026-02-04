"use client";

import React, { JSX } from "react";
import { useMe } from "@/features/auth/hooks/useMe";
import { useServiceManagement } from "@/features/admin/services/hooks/useServiceManagement";
import { 
  ServicesHeader, 
  ServiceList, 
  ServiceModal, 
  ItemModal 
} from "@/features/admin/services/components";

export default function ServicesPage(): JSX.Element {
  const { data: userData } = useMe();
  const adminId = userData?.user._id || "";

  // Use custom hook for all service management logic
  const {
    services,
    items,
    openServiceId,
    setOpenServiceId,
    serviceModal,
    itemModal,
    handleSaveService,
    handleDeleteService,
    handleSaveItem,
    handleDeleteItem,
    openNewServiceModal,
    openEditServiceModal,
    openNewItemModal,
    openEditItemModal,
    closeServiceModal,
    closeItemModal,
  } = useServiceManagement(adminId);

  return (
    <div className="w-full p-6 space-y-6">
      <ServicesHeader onAddService={openNewServiceModal} />

      <ServiceList
        services={services}
        items={items}
        openServiceId={openServiceId}
        onToggleService={(id) => setOpenServiceId(openServiceId === id ? null : id)}
        onEditService={openEditServiceModal}
        onDeleteService={handleDeleteService}
        onAddItem={openNewItemModal}
        onEditItem={openEditItemModal}
        onDeleteItem={handleDeleteItem}
      />

      {serviceModal && (
        <ServiceModal
          service={serviceModal}
          onSave={handleSaveService}
          onClose={closeServiceModal}
        />
      )}

      {itemModal && (
        <ItemModal
          item={itemModal}
          onSave={handleSaveItem}
          onClose={closeItemModal}
        />
      )}
    </div>
  );
}
