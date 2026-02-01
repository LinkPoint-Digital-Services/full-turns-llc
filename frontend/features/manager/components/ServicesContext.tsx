"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  services as initialServices,
  serviceItems as initialItems,
  Service,
  Item,
} from "./serviceData";

interface ServicesContextType {
  services: Service[];
  items: Item[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [items, setItems] = useState<Item[]>(initialItems);

  const addService = (service: Service) => {
    setServices((prev) => [...prev, service]);
  };

  const updateService = (service: Service) => {
    setServices((prev) =>
      prev.map((s) => (s._id === service._id ? service : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s._id !== id));
    // Also delete associated items
    setItems((prev) => prev.filter((i) => i.serviceId !== id));
  };

  const addItem = (item: Item) => {
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (item: Item) => {
    setItems((prev) =>
      prev.map((i) => (i.itemId === item.itemId ? item : i))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.itemId !== id));
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        items,
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
