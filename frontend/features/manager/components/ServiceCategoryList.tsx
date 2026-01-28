import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ServiceCategory {
  name: string;
  icon: LucideIcon;
}

interface ServiceCategoryListProps {
  categories: ServiceCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ServiceCategoryList = ({
  categories,
  activeCategory,
  onCategoryChange,
}: ServiceCategoryListProps) => {
  return (
    <div className="w-full md:w-64 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
      <h3 className="hidden md:block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
        Service Categories
      </h3>
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-left transition-all whitespace-nowrap md:whitespace-normal text-sm md:text-base",
              activeCategory === category.name
                ? "bg-primary text-black font-medium shadow-sm"
                : "text-gray-600 hover:bg-gray-100 bg-white md:bg-transparent border md:border-0"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};
