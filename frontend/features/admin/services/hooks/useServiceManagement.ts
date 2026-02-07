import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppMutation } from "@/features/shared/hooks/useAppMutation";
import { adminClient } from "@/features/admin/adminClient";
import { useServices } from "@/features/manager/components/ServicesContext";
import { Service, Item } from "@/features/manager/components/serviceData";
import { GetServicesResponse, GetItemsResponse } from "@/features/shared/types/api.types";
import { ItemData } from "@/features/admin/types/services.types";

export function useServiceManagement(adminId: string) {
  const queryClient = useQueryClient();
  const {
    services: contextServices,
    items: contextItems,
    addService,
    updateService,
    deleteService,
    addItem,
    updateItem,
    deleteItem,
  } = useServices();

  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const [serviceModal, setServiceModal] = useState<Service | null>(null);
  const [itemModal, setItemModal] = useState<Item | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [isNewService, setIsNewService] = useState(false);

  // Fetch services from API
  const { data: servicesData, isLoading: isLoadingServices } = useQuery<GetServicesResponse>({
    queryKey: ["services", adminId],
    queryFn: () => adminClient.getServices(adminId),
    enabled: !!adminId,
  });

  // Fetch items from API
  const { data: itemsData, isLoading: isLoadingItems } = useQuery<GetItemsResponse>({
    queryKey: ["items", adminId],
    queryFn: () => adminClient.getItems(adminId),
    enabled: !!adminId,
  });

  // Use API data if available, otherwise fall back to context data
  const services = servicesData?.data || contextServices;
  const items = itemsData?.data 
    ? itemsData.data.map((item: ItemData) => ({ ...item, itemId: item._id }))
    : contextItems;
  const isLoading = isLoadingServices || isLoadingItems;

  // Service mutations
  const addServiceMutation = useAppMutation({
    mutationFn: adminClient.addService,
    successMessage: "Service added successfully",
    errorMessage: "Failed to add service",
    onSuccessExtra: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const updateServiceMutation = useAppMutation({
    mutationFn: adminClient.updateService,
    successMessage: "Service updated successfully",
    errorMessage: "Failed to update service",
    onSuccessExtra: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const deleteServiceMutation = useAppMutation({
    mutationFn: adminClient.deleteService,
    successMessage: "Service deleted successfully",
    errorMessage: "Failed to delete service",
    onSuccessExtra: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // Item mutations
  const addItemMutation = useAppMutation({
    mutationFn: adminClient.addItem,
    successMessage: "Item added successfully",
    errorMessage: "Failed to add item",
    onSuccessExtra: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateItemMutation = useAppMutation({
    mutationFn: adminClient.updateItem,
    successMessage: "Item updated successfully",
    errorMessage: "Failed to update item",
    onSuccessExtra: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteItemMutation = useAppMutation({
    mutationFn: adminClient.deleteItem,
    successMessage: "Item deleted successfully",
    errorMessage: "Failed to delete item",
    onSuccessExtra: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // Handlers
  const handleSaveService = (service: Service) => {
    if (isNewService) {
      addServiceMutation.mutate({
        admin_id: adminId,
        service: {
          ...service,
        },
      });
      addService(service);
    } else {
      const { _id, ...updateData } = service;
      updateServiceMutation.mutate({
        admin_id: adminId,
        serviceId: _id,
        updateData: {
          ...updateData,
        },
      });
      updateService(service);
    }
    setServiceModal(null);
    setIsNewService(false);
  };

  const handleDeleteService = (id: string) => {
    if (!confirm("Delete service and all items?")) return;

    deleteServiceMutation.mutate({
      admin_id: adminId,
      service_id: id,
    });
    deleteService(id);
  };

  const handleSaveItem = (item: Item) => {
    if (isNewItem) {
      addItemMutation.mutate({
        admin_id: adminId,
        item: {
          ...item,
          selectionType: item.selectionType || "individual",
        },
      });
      addItem(item);
    } else {
      const { itemId, ...updateData } = item;
      updateItemMutation.mutate({
        admin_id: adminId,
        itemId: itemId,
        updateData: {
          ...updateData,
          selectionType: item.selectionType || "individual",
          imageUrl: item.imageUrl || "",
        },
      });
      updateItem(item);
    }
    setItemModal(null);
    setIsNewItem(false);
  };

  const handleDeleteItem = (id: string) => {
    if (!confirm("Delete item?")) return;

    deleteItemMutation.mutate({
      admin_id: adminId,
      item_id: id,
    });
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

  const openEditServiceModal = (service: Service) => {
    setServiceModal(service);
    setIsNewService(false);
  };

  const openNewItemModal = (serviceId: string) => {
    setItemModal({
      itemId: `item_${crypto.randomUUID()}`,
      name: "",
      imageUrl: "",
      serviceId: serviceId,
      basePrice: 0,
      measurement: "fixed",
      addOns: [],
      allowCustomDetails: false,
      selectionType: "individual",
    });
    setIsNewItem(true);
  };

  const openEditItemModal = (item: Item) => {
    setItemModal(item);
    setIsNewItem(false);
  };

  const closeServiceModal = () => {
    setServiceModal(null);
    setIsNewService(false);
  };

  const closeItemModal = () => {
    setItemModal(null);
    setIsNewItem(false);
  };

  return {
    // State
    services,
    items,
    isLoading,
    openServiceId,
    setOpenServiceId,
    serviceModal,
    itemModal,
    isNewService,
    isNewItem,

    // Handlers
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
  };
}
