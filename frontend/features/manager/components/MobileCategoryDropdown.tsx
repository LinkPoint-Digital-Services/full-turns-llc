"use client";

import {useState} from "react";
import {Filter, ChevronDown} from "lucide-react";
import {Service, getIcon} from "./serviceData";
import {cn} from "@/lib/utils";

interface MobileCategoryDropdownProps {
  activeServiceId: string;
  onServiceChange: (serviceId: string) => void;
  services: Service[];
}

export const MobileCategoryDropdown = ({
  activeServiceId,
  onServiceChange,
  services = [],
}: MobileCategoryDropdownProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeService =
    services.find((s) => s._id === activeServiceId) ||
    (services.length > 0 ? services[0] : null);

  if (!activeService) return null;

  return (
    <div className="md:hidden w-full my-4">
      <div className="relative">
        {/* Dropdown menu that expands downward */}
        {isSidebarOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
            {services.map((category) => {
              const Icon = getIcon(category.icon);
              return (
                <button
                  key={category._id}
                  onClick={() => {
                    onServiceChange(category._id);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-100 last:border-b-0",
                    activeService._id === category._id
                      ? "bg-primary text-black font-medium"
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{category.serviceName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dropdown trigger button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen((open) => !open)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm shadow-sm"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{activeService.serviceName}</span>
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-500 transition-transform",
              isSidebarOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
      </div>
    </div>
  );
};
