import {Item, formatPrice} from "./serviceData";
import NextImage from "next/image";

interface ServiceItemGridProps {
  title: string;
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const getPriceDisplay = (item: Item): string => {
  if (item.selectionType === "checklist") {
    return "Starts at $0";
  }
  return formatPrice(item.basePrice);
};

export const ServiceItemGrid = ({
  items,
  onItemSelect,
}: ServiceItemGridProps) => {
  return (
    <div className="flex-1 rounded-xl md:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => {
          const priceDisplay = getPriceDisplay(item);

          return (
            <button
              key={item.itemId}
              onClick={() => onItemSelect(item)}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                {item.imageUrl ? (
                  <NextImage
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <span className="text-xs font-medium uppercase tracking-wider">
                      No Preview
                    </span>
                  </div>
                )}
                {/* Overlay for Checklist badge */}
                {item.selectionType === "checklist" && (
                  <div className="absolute top-3 right-3 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                    CHECKLIST
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-3 md:p-4 flex flex-col flex-1 gap-2">
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors text-xs md:text-sm line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                  {item.notes && (
                    <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto pt-1">
                  <span className="text-primary font-bold text-sm md:text-base">
                    {priceDisplay}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
