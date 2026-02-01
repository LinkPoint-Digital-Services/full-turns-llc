import { Service, Item } from '@/features/manager/components/serviceData';

// ============================================
// SERVICE TYPES
// ============================================

export interface AddServiceRequest {
  admin_id: string;
  service: {
    _id: string;
    serviceName: string;
    icon: string;
  };
}

export interface UpdateServiceRequest {
  admin_id: string;
  serviceId: string;
  updateData: {
    serviceName?: string;
    icon?: string;
  };
}

export interface DeleteServiceRequest {
  admin_id: string;
  service_id: string;
}

export interface ServiceItem extends Service {
  created_at: string;
  updated_at: string;
}

// ============================================
// ITEM TYPES
// ============================================

export interface AddItemRequest {
  admin_id: string;
  item: {
    itemId: string;
    name: string;
    icon: string;
    serviceId: string;
    basePrice: number;
    measurement: "room" | "sqft" | "unit" | "each" | "hour" | "fixed" | "varies";
    allowCustomDetails?: boolean;
    notes?: string;
    addOns?: {
      addOnsId: string;
      name: string;
      price: number;
    }[];
  };
}

export interface UpdateItemRequest {
  admin_id: string;
  itemId: string;
  updateData: {
    name?: string;
    icon?: string;
    serviceId?: string;
    basePrice?: number;
    measurement?: "room" | "sqft" | "unit" | "each" | "hour" | "fixed" | "varies";
    allowCustomDetails?: boolean;
    notes?: string;
    addOns?: {
      addOnsId: string;
      name: string;
      price: number;
    }[];
  };
}

export interface DeleteItemRequest {
  admin_id: string;
  item_id: string;
}

export interface ItemData extends Item {
  created_at: string;
  updated_at: string;
}
