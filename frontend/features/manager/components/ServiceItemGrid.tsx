import { Item, formatPrice, getIcon } from "./serviceData";

interface ServiceItemGridProps {
  title: string;
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const getPriceDisplay = (item: Item): string => {
  // Simplified price display logic based on new schema
  // "room" | "sqft" | "unit" | "each"
  const price = formatPrice(item.basePrice);
  
  if (item.measurement === "unit" || item.measurement === "each") {
    // For unit/each, typically just the price, or "per unit" if desired.
    // The price list usually shows just the price.
    // But if it's something like "Outlets Replace ... $10.00 each", we might want to show "/each"
    return item.measurement === "each" ? `${price} each` : price;
  }
  
  return `${price}/${item.measurement}`;
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

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {items.map((item) => {
          const ItemIcon = getIcon(item.icon);
          const priceDisplay = getPriceDisplay(item);

          return (
            <button
              key={item.itemId}
              onClick={() => onItemSelect(item)}
              className="group flex flex-col items-center justify-center p-4 md:p-6 h-40 md:h-48 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="p-2 md:p-3 rounded-full bg-gray-50 text-gray-500 mb-2 md:mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ItemIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-primary transition-colors text-xs md:text-sm text-center px-2 mb-2 line-clamp-2">
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
