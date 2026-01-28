import { LucideIcon } from "lucide-react";
import { ServiceItem, formatPrice } from "./serviceData";

interface ServiceItemGridProps {
  title: string;
  items: ServiceItem[];
  onItemSelect: (item: ServiceItem) => void;
}

const getPriceDisplay = (item: ServiceItem): string => {
  const { pricing } = item;

  switch (pricing.type) {
    case "fixed":
      return formatPrice(pricing.basePrice || 0);

    case "per_unit":
      if (pricing.variants && pricing.variants.length > 0) {
        const prices = pricing.variants.map((v) => v.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max
          ? formatPrice(min)
          : `${formatPrice(min)} - ${formatPrice(max)}`;
      }
      return `${formatPrice(pricing.basePrice || 0)}/${pricing.unit}`;

    case "per_sqft":
      return `${formatPrice(pricing.basePrice || 0)}/${pricing.unit}`;

    case "custom":
      return "Custom Pricing";

    default:
      return "Contact for pricing";
  }
};

export const ServiceItemGrid = ({
  title,
  items,
  onItemSelect,
}: ServiceItemGridProps) => {
  return (
    <div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-100 p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500 text-xs md:text-sm">Select a service to configure</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {items.map((item) => {
          const ItemIcon = item.icon;
          const priceDisplay = getPriceDisplay(item);

          return (
            <button
              key={item.id}
              onClick={() => onItemSelect(item)}
              className="group flex flex-col items-center justify-center p-4 md:p-6 h-40 md:h-48 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="p-2 md:p-3 rounded-full bg-gray-50 text-gray-500 mb-2 md:mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ItemIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-primary transition-colors text-xs md:text-sm text-center px-2 mb-2">
                {item.name}
              </span>
              <span className="text-primary font-bold text-sm md:text-base">
                {priceDisplay}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
