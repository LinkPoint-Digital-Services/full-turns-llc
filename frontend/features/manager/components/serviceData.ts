
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
  LucideIcon,
  Ruler,
  DoorOpen,
  Fan,
  Lightbulb,
  Plug,
  Trash2
} from "lucide-react";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Service {
  _id: string;
  serviceName: string;
  icon: string;
}

export interface Item {
  itemId: string;
  name: string;
  icon: string;
  serviceId: string; // Foreign key to link to Service (Category)
  basePrice: number;
  measurement: "room" | "sqft" | "unit" | "each" | "hour" | "fixed" | "varies";
  allowCustomDetails?: boolean;
  addOns?: {
    addOnsId: string;
    name: string;
    price: number;
  }[];
}

// ============================================
// SERVICE CATEGORIES (SERVICES)
// ============================================

export const services: Service[] = [
  {
    _id: "service_refinish",
    serviceName: "Refinish Services",
    icon: "Paintbrush",
  },
  {
    _id: "service_painting",
    serviceName: "Painting Services",
    icon: "Layers",
  },
  // Drywall Services merged into Painting as requested
  {
    _id: "service_cleaning",
    serviceName: "Deep Cleaning Services",
    icon: "Droplet",
  },
  {
    _id: "service_renovation",
    serviceName: "Unit Upgrade Services",
    icon: "Hammer",
  },
  {
    _id: "service_maintenance",
    serviceName: "Maintenance Services",
    icon: "Wrench",
  },
];

// ============================================
// SERVICE ITEMS
// ============================================

export const serviceItems: Item[] = [
  // --- REFINISH SERVICES ---
  {
    itemId: "item_refinish_bathtub",
    name: "Bathtub Refinish",
    icon: "Droplet",
    serviceId: "service_refinish",
    basePrice: 250.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_tile_walls",
    name: "Bathroom Tile Walls",
    icon: "Grid",
    serviceId: "service_refinish",
    basePrice: 350.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_bathtub_3walls",
    name: "Bathtub + Tile Walls (3 Walls)",
    icon: "LayoutTemplate",
    serviceId: "service_refinish",
    basePrice: 500.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_shower_pan",
    name: "Shower Pan",
    icon: "Square",
    serviceId: "service_refinish",
    basePrice: 100.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_sink",
    name: "Sink Refinish",
    icon: "Droplet",
    serviceId: "service_refinish",
    basePrice: 100.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_cabinets_stain",
    name: "Cabinets Refinish (Stain)",
    icon: "Paintbrush",
    serviceId: "service_refinish",
    basePrice: 300.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_cabinets_paint",
    name: "Cabinets Refinish (Primer and Paint)",
    icon: "Paintbrush",
    serviceId: "service_refinish",
    basePrice: 400.0,
    measurement: "fixed",
  },
  {
    itemId: "item_refinish_bath_cabinets",
    name: "Bath Cabinets (Stain or Paint)",
    icon: "Paintbrush",
    serviceId: "service_refinish",
    basePrice: 80.0,
    measurement: "unit", // Quantity likely
  },

  // --- PAINTING SERVICES ---
  {
    itemId: "item_paint_1bed",
    name: "One Bedroom Apartments",
    icon: "Layers",
    serviceId: "service_painting",
    basePrice: 490.0,
    measurement: "fixed",
    addOns: [
      {
        addOnsId: "addon_paint_1bed_double_coat",
        name: "Double Coating",
        price: 150.0,
      },
      {
        addOnsId: "addon_paint_1bed_extra_prep",
        name: "Extra Prep",
        price: 100.0,
      },
    ],
  },
  {
    itemId: "item_paint_2bed",
    name: "Two Bedrooms Apartments",
    icon: "Layers",
    serviceId: "service_painting",
    basePrice: 580.0,
    measurement: "fixed",
    addOns: [
      {
        addOnsId: "addon_paint_2bed_double_coat",
        name: "Double Coating",
        price: 200.0,
      },
      {
        addOnsId: "addon_paint_2bed_extra_prep",
        name: "Extra Prep",
        price: 120.0,
      },
    ],
  },
  {
    itemId: "item_paint_3bed",
    name: "Three Bedrooms Apartments",
    icon: "Layers",
    serviceId: "service_painting",
    basePrice: 670.0,
    measurement: "fixed",
    addOns: [
      {
        addOnsId: "addon_paint_3bed_double_coat",
        name: "Double Coating",
        price: 250.0,
      },
      {
        addOnsId: "addon_paint_3bed_extra_prep",
        name: "Extra Prep",
        price: 150.0,
      },
    ],
  },
  {
    itemId: "item_paint_balcony",
    name: "Concrete Balcony Floor",
    icon: "Square",
    serviceId: "service_painting",
    basePrice: 200.0,
    measurement: "fixed",
  },

  // --- DRYWALL ITEMS (Now under PAINTING) ---
  {
    itemId: "item_drywall_repair_sqft",
    name: "Repair of Drywalls",
    icon: "Square",
    serviceId: "service_painting",
    basePrice: 20.0,
    measurement: "sqft",
  },
  {
    itemId: "item_drywall_replace_half",
    name: "Drywalls Replace ¼ Sheet",
    icon: "Square",
    serviceId: "service_painting",
    basePrice: 75.0,
    measurement: "fixed",
  },
  {
    itemId: "item_drywall_replace_quarter",
    name: "Drywalls Replace ½ Sheet",
    icon: "Square",
    serviceId: "service_painting",
    basePrice: 150.0,
    measurement: "fixed",
  },
  {
    itemId: "item_drywall_replace_full",
    name: "Drywalls Replace 1 Sheet",
    icon: "Square",
    serviceId: "service_painting",
    basePrice: 200.0,
    measurement: "unit",
  },

  // --- DEEP CLEANING SERVICES ---
  {
    itemId: "item_cleaning_deep",
    name: "Deep Cleaning Services",
    icon: "Trash2",
    serviceId: "service_cleaning",
    basePrice: 150.0,
    measurement: "room",
  },

  // --- RENOVATION SERVICES ---
  {
    itemId: "item_reno_door",
    name: "Door Replaces",
    icon: "DoorOpen",
    serviceId: "service_renovation",
    basePrice: 160.0,
    measurement: "each",
  },
  {
    itemId: "item_reno_baseboard",
    name: "Baseboard and Trims Installation",
    icon: "Ruler",
    serviceId: "service_renovation",
    basePrice: 2.0,
    measurement: "sqft",
  },
  {
    itemId: "item_reno_lvp",
    name: "LVP Floor (Vinyl) and Shoe",
    icon: "Grid",
    serviceId: "service_renovation",
    basePrice: 1.5,
    measurement: "sqft",
  },
  {
    itemId: "item_reno_molding",
    name: "Molding Installation",
    icon: "Ruler",
    serviceId: "service_renovation",
    basePrice: 1.0,
    measurement: "sqft",
  },
  {
    itemId: "item_reno_outlets",
    name: "Outlets Replace",
    icon: "Plug",
    serviceId: "service_renovation",
    basePrice: 10.0,
    measurement: "each",
  },
  {
    itemId: "item_reno_switches",
    name: "Switches Replace",
    icon: "Zap",
    serviceId: "service_renovation",
    basePrice: 10.0,
    measurement: "each",
  },
  {
    itemId: "item_reno_light_fixtures",
    name: "Light Fixtures Installation",
    icon: "Lightbulb",
    serviceId: "service_renovation",
    basePrice: 40.0,
    measurement: "each",
  },
  {
    itemId: "item_reno_ceiling_fans",
    name: "Ceiling Fans Installation",
    icon: "Fan",
    serviceId: "service_renovation",
    basePrice: 60.0,
    measurement: "each",
  },
  {
    itemId: "item_reno_toilet",
    name: "New Toilets Replace",
    icon: "Droplet",
    serviceId: "service_renovation",
    basePrice: 120.0,
    measurement: "each",
    addOns: [
      {
        addOnsId: "addon_new_toilet_price",
        name: "New toilet price",
        price: 120.0,
      },
    ],
  },

  // --- MAINTENANCE SERVICES ---
  {
    itemId: "item_maintenance_punchout",
    name: "Punch Outs Services",
    icon: "Wrench",
    serviceId: "service_maintenance",
    basePrice: 250.0,
    measurement: "varies",
    allowCustomDetails: true,
  },
];

// ============================================
// HELPER: ICON RESOLVER
// ============================================

export const iconMap: Record<string, LucideIcon> = {
  Paintbrush: Paintbrush,
  Hammer: Hammer,
  Wrench: Wrench,
  Square: Square,
  Layers: Layers,
  Grid: Grid,
  LayoutTemplate: LayoutTemplate,
  Zap: Zap,
  Droplet: Droplet,
  Ruler: Ruler,
  DoorOpen: DoorOpen,
  Fan: Fan,
  Lightbulb: Lightbulb,
  Plug: Plug,
  Trash2: Trash2
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Hammer; // Default fallback
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getServiceById = (id: string): Service | undefined => {
  return services.find(s => s._id === id);
};

export const getItemsByServiceId = (serviceId: string): Item[] => {
  return serviceItems.filter(item => item.serviceId === serviceId);
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Legacy support if needed? No, refactoring everything.
