"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Service, Item} from "./serviceData";
import {managerClient} from "../managerClient";
import {
  GetItemsResponse,
  GetServicesResponse,
} from "@/features/shared/types/api.types";
import {ItemData, ServiceItem} from "@/features/admin/types/services.types";

interface ServicesContextType {
  services: Service[];
  items: Item[];
  loading: boolean;
  setServices: (services: Service[]) => void;
  setItems: (items: Item[]) => void;
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined,
);

export const ServicesProvider = ({children}: {children: ReactNode}) => {
  const adminId = "";
  const queryClient = useQueryClient();

  const servicesQuery = useQuery<GetServicesResponse>({
    queryKey: ["manager", "services", adminId],
    queryFn: () => managerClient.getServices(adminId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const itemsQuery = useQuery<GetItemsResponse>({
    queryKey: ["manager", "items", adminId],
    queryFn: () => managerClient.getItems(adminId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  if (servicesQuery.error) {
    console.error("Services request failed:", servicesQuery.error);
  }
  if (itemsQuery.error) {
    console.error("Items request failed:", itemsQuery.error);
  }

  const services = servicesQuery.data?.success
    ? servicesQuery.data.data || []
    : [];

  const items = useMemo<Item[]>(() => {
    if (!itemsQuery.data?.success) return [];
    return (itemsQuery.data.data || []).map((item: ItemData) => ({
      ...item,
      itemId: item._id, // Map backend _id to itemId for consistency
    }));
  }, [itemsQuery.data]);

  const loading = servicesQuery.isLoading || itemsQuery.isLoading;

  const setServices = (next: Service[]) => {
    const mapped: ServiceItem[] = next.map((service) => {
      const existing = servicesQuery.data?.data?.find(
        (s) => s._id === service._id
      );
      return {
        ...service,
        created_at: existing?.created_at ?? "",
        updated_at: existing?.updated_at ?? ""
      };
    });
    queryClient.setQueryData<GetServicesResponse>(
      ["manager", "services", adminId],
      (old) => ({
        success: true,
        message: old?.message ?? "",
        data: mapped
      })
    );
  };

  const setItems = (next: Item[]) => {
    const mapped: ItemData[] = next.map((item) => ({
      ...(item as ItemData),
      _id: (item as Item).itemId
    }));
    queryClient.setQueryData<GetItemsResponse>(
      ["manager", "items", adminId],
      (old) => ({
        success: true,
        message: old?.message ?? "",
        data: mapped
      })
    );
  };

  const addService = (service: Service) => {
    setServices([...services, service]);
  };

  const updateService = (service: Service) => {
    setServices(services.map((s) => (s._id === service._id ? service : s)));
  };

  const deleteService = (id: string) => {
    setServices(services.filter((s) => s._id !== id));
    // Also delete associated items
    setItems(items.filter((i) => i.serviceId !== id));
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const updateItem = (item: Item) => {
    setItems(items.map((i) => (i.itemId === item.itemId ? item : i)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((i) => i.itemId !== id));
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        items,
        loading,
        setServices,
        setItems,
        addService,
        updateService,
        deleteService,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
