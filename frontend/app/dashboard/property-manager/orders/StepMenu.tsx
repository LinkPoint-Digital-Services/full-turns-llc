import { PlusCircle, FileText, Calculator, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepMenuProps {
  onCreateOrder: () => void;
}

export const StepMenu = ({ onCreateOrder }: StepMenuProps) => {
  const menuItems = [
    {
      title: "Create Order",
      description: "Start a new turn service request",
      icon: PlusCircle,
      action: onCreateOrder,
      variant: "primary",
      disabled: false,
    },
    {
      title: "View Prices",
      description: "Check current service rates",
      icon: FileText,
      action: () => {},
      variant: "secondary",
      disabled: true,
    },
    {
      title: "Create Estimates",
      description: "Get a quote for a project",
      icon: Calculator,
      action: () => {},
      variant: "secondary",
      disabled: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-10">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          disabled={item.disabled}
          className={cn(
            "group relative flex flex-col items-start p-5 md:p-6 h-48 md:h-60 rounded-xl border transition-all duration-300 text-left",
            item.disabled 
              ? "opacity-50 border-gray-100 bg-gray-50 cursor-not-allowed" 
              : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          )}
        >
          <div className={cn(
            "p-2.5 md:p-3 rounded-lg mb-4 md:mb-6 transition-colors",
            item.disabled ? "bg-gray-100 text-gray-400" : "bg-primary/5 text-primary group-hover:bg-primary/10"
          )}>
            <item.icon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-[90%] md:max-w-[80%]">
            {item.description}
          </p>

          {!item.disabled && (
            <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-primary" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
