import {
  Paintbrush,
  Hammer,
  Wrench,
  Square,
  Layers,
  Grid,
  LayoutTemplate,
  Zap,
  Droplet,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type PricingType = "fixed" | "per_unit" | "per_sqft" | "custom";
export type ServiceCategoryKey =
  | "refinish"
  | "painting"
  | "cleaning"
  | "unit_upgrade"
  | "maintenance"
  // internal-only services that should not show in the UI
  | "internal";

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategoryKey;
  icon: LucideIcon;
  description?: string;
  pricing: {
    type: PricingType;
    basePrice?: number;
    unit?: string; // e.g., "room", "sheet", "sqft", "each"
    variants?: {
      name: string;
      price: number;
    }[];
  };
  requiresConfig: boolean;
  configType?: "modal" | "direct";
}

export interface ServiceCategory {
  id: ServiceCategoryKey;
  name: string;
  displayName: string;
  icon: LucideIcon;
  description: string;
}

// ============================================
// SERVICE CATEGORIES
// ============================================

export const serviceCategories: ServiceCategory[] = [
  {
    id: "refinish",
    name: "Refinish Services",
    displayName: "Refinish Services",
    icon: Paintbrush,
    description: "Professional refinishing services for bathrooms and kitchens",
  },
  {
    id: "painting",
    name: "Painting Services",
    displayName: "Painting Services",
    icon: Paintbrush,
    description: "Complete painting solutions for apartments and units",
  },
  {
    id: "cleaning",
    name: "Deep Cleaning Services",
    displayName: "Deep Cleaning Services",
    icon: Droplet,
    description: "Thorough deep cleaning services",
  },
  {
    id: "unit_upgrade",
    name: "Unit-Upgrade",
    displayName: "Unit-Upgrade",
    icon: Hammer,
    description: "Renovation and upgrade services for units",
  },
  {
    id: "maintenance",
    name: "Maintenance Services",
    displayName: "Maintenance Services",
    icon: Wrench,
    description: "General maintenance and punch-out services",
  },
];

// ============================================
// SERVICE ITEMS DATABASE
// ============================================

export const serviceItems: ServiceItem[] = [
  // REFINISH SERVICES
  {
    id: "refinish_bathtub",
    name: "Bathtub Refinish",
    category: "refinish",
    icon: Layers,
    description: "Complete bathtub refinishing",
    pricing: {
      type: "fixed",
      basePrice: 250.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_bathroom_tile",
    name: "Bathroom Tile Walls",
    category: "refinish",
    icon: Square,
    description: "Bathroom tile wall refinishing",
    pricing: {
      type: "fixed",
      basePrice: 250.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_bathtub_tile_3",
    name: "Bathtub + Tile Walls (3 Walls)",
    category: "refinish",
    icon: LayoutTemplate,
    description: "Bathtub and 3 tile walls refinishing",
    pricing: {
      type: "fixed",
      basePrice: 500.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_bathtub_tile_5",
    name: "Bathtub + Tile Walls (5 Walls)",
    category: "refinish",
    icon: Grid,
    description: "Bathtub and 5 tile walls refinishing",
    pricing: {
      type: "fixed",
      basePrice: 500.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_shower_pan",
    name: "Shower Pan",
    category: "refinish",
    icon: Droplet,
    description: "Shower pan refinishing",
    pricing: {
      type: "fixed",
      basePrice: 100.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_sink",
    name: "Sink Refinish",
    category: "refinish",
    icon: Droplet,
    description: "Sink refinishing",
    pricing: {
      type: "fixed",
      basePrice: 100.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_cabinets_stain",
    name: "Cabinets Refinish (Stain)",
    category: "refinish",
    icon: Paintbrush,
    description: "Cabinet refinishing with stain",
    pricing: {
      type: "fixed",
      basePrice: 300.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_cabinets_paint",
    name: "Cabinets Refinish (Prime and Paint)",
    category: "refinish",
    icon: Paintbrush,
    description: "Cabinet refinishing with prime and paint",
    pricing: {
      type: "fixed",
      basePrice: 300.0,
    },
    requiresConfig: false,
  },
  {
    id: "refinish_bath_cabinets",
    name: "Bath Cabinets (Stain or Paint)",
    category: "refinish",
    icon: Paintbrush,
    description: "Bathroom cabinet refinishing",
    pricing: {
      type: "fixed",
      basePrice: 80.0,
    },
    requiresConfig: false,
  },

  // PAINTING SERVICES
  {
    id: "painting_apartments",
    name: "Paint",
    category: "painting",
    icon: Paintbrush,
    description: "Complete apartment painting service",
    pricing: {
      type: "per_unit",
      unit: "bedroom",
      variants: [
        { name: "One Bedroom Apartments", price: 490.0 },
        { name: "Two Bedrooms Apartments", price: 580.0 },
        { name: "Three Bedrooms Apartments", price: 670.0 },
      ],
    },
    requiresConfig: true,
    configType: "modal",
  },
  {
    id: "painting_concrete_balcony",
    name: "Concrete Balcony Floor",
    category: "internal",
    icon: Square,
    description: "Concrete balcony floor painting",
    pricing: {
      type: "fixed",
      basePrice: 200.0,
    },
    requiresConfig: false,
  },
  {
    id: "painting_drywall_repair_sqft",
    name: "Repair of Drywalls (per sqft)",
    category: "internal",
    icon: Layers,
    description: "Drywall repair per square foot",
    pricing: {
      type: "per_sqft",
      basePrice: 20.0,
      unit: "sqft",
    },
    requiresConfig: false,
  },
  {
    id: "painting_drywall_replace_half",
    name: "Drywalls Replace ½ Sheet",
    category: "internal",
    icon: Layers,
    description: "Replace half sheet of drywall",
    pricing: {
      type: "fixed",
      basePrice: 75.0,
    },
    requiresConfig: false,
  },
  {
    id: "painting_drywall_replace_quarter",
    name: "Drywalls Replace ¼ Sheet",
    category: "internal",
    icon: Layers,
    description: "Replace quarter sheet of drywall",
    pricing: {
      type: "fixed",
      basePrice: 150.0,
    },
    requiresConfig: false,
  },
  {
    id: "painting_drywall_replace_full",
    name: "Drywalls Replace 1 Sheet",
    category: "internal",
    icon: Layers,
    description: "Replace full sheet of drywall",
    pricing: {
      type: "fixed",
      basePrice: 200.0,
    },
    requiresConfig: false,
  },

  // DEEP CLEANING SERVICES
  {
    id: "cleaning_deep",
    name: "Deep Cleaning Services",
    category: "cleaning",
    icon: Droplet,
    description: "Complete deep cleaning service",
    pricing: {
      type: "fixed",
      basePrice: 150.0,
    },
    requiresConfig: false,
  },

  // UNIT-UPGRADE SERVICES
  {
    id: "upgrade_door_replace",
    name: "Door Replaces",
    category: "unit_upgrade",
    icon: Hammer,
    description: "Door replacement service",
    pricing: {
      type: "fixed",
      basePrice: 160.0,
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_baseboard_trims",
    name: "Baseboard and Trims Installation",
    category: "unit_upgrade",
    icon: Wrench,
    description: "Baseboard and trims installation",
    pricing: {
      type: "per_sqft",
      basePrice: 2.0,
      unit: "RLF", // Running Linear Foot
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_lvp_floor",
    name: "LVP Floor (Vinyl) and Shoe",
    category: "unit_upgrade",
    icon: Grid,
    description: "LVP flooring installation",
    pricing: {
      type: "per_sqft",
      basePrice: 1.5,
      unit: "sqft",
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_molding",
    name: "Molding Installation",
    category: "unit_upgrade",
    icon: LayoutTemplate,
    description: "Molding installation",
    pricing: {
      type: "per_sqft",
      basePrice: 1.0,
      unit: "sqft",
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_outlets",
    name: "Outlets Replace",
    category: "unit_upgrade",
    icon: Zap,
    description: "Electrical outlet replacement",
    pricing: {
      type: "per_unit",
      basePrice: 10.0,
      unit: "each",
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_switches",
    name: "Switches Replace",
    category: "unit_upgrade",
    icon: Zap,
    description: "Light switch replacement",
    pricing: {
      type: "per_unit",
      basePrice: 10.0,
      unit: "each",
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_light_fixtures",
    name: "Light Fixtures Installation",
    category: "unit_upgrade",
    icon: Zap,
    description: "Light fixture installation",
    pricing: {
      type: "per_unit",
      basePrice: 40.0,
      unit: "each",
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_ceiling_fans",
    name: "Ceiling Fans Installation",
    category: "unit_upgrade",
    icon: Zap,
    description: "Ceiling fan installation",
    pricing: {
      type: "per_unit",
      basePrice: 60.0,
      unit: "each",
    },
    requiresConfig: false,
  },
  {
    id: "upgrade_toilet",
    name: "New Toilet Replace",
    category: "unit_upgrade",
    icon: Droplet,
    description: "Toilet replacement",
    pricing: {
      type: "per_unit",
      basePrice: 120.0,
      unit: "each",
    },
    requiresConfig: false,
  },

  // MAINTENANCE SERVICES
  {
    id: "maintenance_punchout",
    name: "Punch-Outs Services",
    category: "maintenance",
    icon: Wrench,
    description: "Custom punch-out services",
    pricing: {
      type: "custom",
      // Price range: $250.00 to $3500
    },
    requiresConfig: true,
    configType: "modal",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate price for a service item
 */
export const calculateServicePrice = (
  serviceId: string,
  quantity: number = 1,
  variantName?: string
): number => {
  const service = serviceItems.find((s) => s.id === serviceId);
  if (!service) return 0;

  const { pricing } = service;

  switch (pricing.type) {
    case "fixed":
      return pricing.basePrice || 0;

    case "per_unit":
    case "per_sqft":
      if (pricing.variants && variantName) {
        const variant = pricing.variants.find((v) => v.name === variantName);
        return variant ? variant.price : 0;
      }
      return (pricing.basePrice || 0) * quantity;

    case "custom":
      return 0; // Custom pricing determined by owner

    default:
      return 0;
  }
};

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Get service by ID
 */
export const getServiceById = (id: string): ServiceItem | undefined => {
  return serviceItems.find((s) => s.id === id);
};

/**
 * Get services by category
 */
export const getServicesByCategory = (
  category: ServiceCategoryKey
): ServiceItem[] => {
  return serviceItems.filter((s) => s.category === category);
};

/**
 * Get category by ID
 */
export const getCategoryById = (
  id: ServiceCategoryKey
): ServiceCategory | undefined => {
  return serviceCategories.find((c) => c.id === id);
};

// ============================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================

export const categoryIcons: Record<string, LucideIcon> = {
  "Refinish Services": Paintbrush,
  "Painting Services": Paintbrush,
  "Deep Cleaning Services": Droplet,
  "Unit-Upgrade": Hammer,
  "Maintenance Services": Wrench,
};

export const services = {
  "Refinish Services": getServicesByCategory("refinish").map((s) => s.name),
  "Painting Services": getServicesByCategory("painting").map((s) => s.name),
  "Deep Cleaning Services": getServicesByCategory("cleaning").map((s) => s.name),
  "Unit-Upgrade": getServicesByCategory("unit_upgrade").map((s) => s.name),
  "Maintenance Services": getServicesByCategory("maintenance").map((s) => s.name),
} as const;

export type LegacyServiceCategory = keyof typeof services;

export const serviceIcons: Record<string, LucideIcon> = serviceItems.reduce(
  (acc, item) => {
    acc[item.name] = item.icon;
    return acc;
  },
  {} as Record<string, LucideIcon>
);

export const servicesRequiringConfig = serviceItems
  .filter((s) => s.requiresConfig)
  .map((s) => s.name);
