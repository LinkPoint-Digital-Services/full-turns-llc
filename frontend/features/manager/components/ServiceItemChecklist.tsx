import {Item, formatPrice} from "./serviceData";
import {Checkbox} from "@/components/ui/checkbox";
import NextImage from "next/image";

interface ServiceItemChecklistProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const getPriceDisplay = (item: Item): string => {
  if (item.selectionType === "checklist") {
    return "Varies";
  }
  return formatPrice(item.basePrice);
};

export const ServiceItemChecklist = ({
  items,
  onItemSelect,
}: ServiceItemChecklistProps) => {
  return (
    <div className="flex-1 rounded-xl p-4 md:p-6 bg-white border border-gray-100">
      <div className="space-y-2">
        {items.map((item) => {
          const priceDisplay = getPriceDisplay(item);

          return (
            <div
              key={item.itemId}
              onClick={() => onItemSelect(item)}
              className="group flex items-center p-3 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <div className="mr-4">
                <Checkbox
                  checked={false} // Since we handle selection through onItemSelect (which adds to cart)
                  className="w-5 h-5 pointer-events-none"
                />
              </div>

              {item.imageUrl && (
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-50 mr-4 border shrink-0">
                  <NextImage
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 group-hover:text-primary transition-colors truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {item.measurement}
                </p>
              </div>

              <div className="text-right ml-4">
                <span className="text-primary font-bold whitespace-nowrap">
                  {priceDisplay}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No items found for this service.
        </div>
      )}
    </div>
  );
};
