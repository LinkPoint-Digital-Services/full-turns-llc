export interface Service {
  _id: string;
  serviceName: string;
  icon: string;
}

export interface Item {
  itemId: string;
  name: string;
  imageUrl?: string;
  serviceId: string; // Foreign key to link to Service (Category)
  basePrice: number;
  measurement: "room" | "sqft" | "unit" | "each" | "hour" | "fixed" | "varies";
  allowCustomDetails?: boolean;
  notes?: string;
  selectionType: "individual" | "checklist";
  addOns?: {
    addOnsId: string;
    name: string;
    price: number;
  }[];
}

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const MEASUREMENTS: Item["measurement"][] = [
  "room",
  "sqft",
  "unit",
  "each",
  "hour",
  "fixed",
  "varies",
];
