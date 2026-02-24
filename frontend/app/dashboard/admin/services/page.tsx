"use client";

import React, { JSX } from "react";
import { useServiceManagement } from "@/features/admin/services/hooks/useServiceManagement";
import { 
  ServicesHeader, 
  ServiceList, 
  ServiceModal, 
  ItemModal,
  DeleteConfirmModal,
} from "@/features/admin/services/components";

export default function ServicesPage(): JSX.Element {
  const adminId = process.env.NEXT_PUBLIC_VENN_ADMIN_ID || "";

  // Use custom hook for all service management logic
  const {
    services,
    items,
    openServiceId,
    setOpenServiceId,
    serviceModal,
    itemModal,
    pendingDelete,
    handleSaveService,
    handleDeleteService,
    handleSaveItem,
    handleDeleteItem,
    confirmDelete,
    cancelDelete,
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
        onDeleteService={(id) => {
          const svc = services.find((s) => s._id === id);
          handleDeleteService(id, svc?.serviceName);
        }}
        onAddItem={openNewItemModal}
        onEditItem={openEditItemModal}
        onDeleteItem={(id) => {
          const item = items.find((i) => i.itemId === id);
          handleDeleteItem(id, item?.name);
        }}
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

      <DeleteConfirmModal
        open={!!pendingDelete}
        title={
          pendingDelete?.type === "service"
            ? "Delete Service"
            : "Delete Item"
        }
        description={
          pendingDelete?.type === "service"
            ? `Are you sure you want to delete "${pendingDelete?.label}"? This will also permanently remove all items under this service.`
            : `Are you sure you want to delete "${pendingDelete?.label}"? This action cannot be undone.`
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
