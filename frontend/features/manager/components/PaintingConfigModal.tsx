import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateServicePrice } from "./serviceData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaintingConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (item: {
    serviceId: string;
    name: string;
    price: number;
    details: string;
  }) => void;
}

type DrywallOption = "none" | "1/4" | "1/2" | "1" | "custom";

export const PaintingConfigModal = ({
  open,
  onOpenChange,
  onAddToCart,
}: PaintingConfigModalProps) => {
  const [rooms, setRooms] = useState(1);
  const [extraPrep, setExtraPrep] = useState(false);
  const [doubleCoating, setDoubleCoating] = useState(false);
  const [drywallRepairType, setDrywallRepairType] = useState<DrywallOption>("none");
  const [customDrywallSheets, setCustomDrywallSheets] = useState(1);

  const PAINT_SERVICE_ID = "painting_apartments";
  const EXTRA_PREP_PRICE = 50;

  const getBasePaintingPrice = (roomCount: number): number => {
    // Base tiers from price list:
    // 1 room  -> 490
    // 2 rooms -> 580
    // 3 rooms -> 670
    // 4+ rooms -> 670 + (rooms - 3) * 90
    if (roomCount <= 0) return 0;

    if (roomCount === 1) {
      return calculateServicePrice(PAINT_SERVICE_ID, 1, "One Bedroom Apartments");
    }

    if (roomCount === 2) {
      return calculateServicePrice(PAINT_SERVICE_ID, 1, "Two Bedrooms Apartments");
    }

    if (roomCount === 3) {
      return calculateServicePrice(PAINT_SERVICE_ID, 1, "Three Bedrooms Apartments");
    }

    const threeBedroomPrice = calculateServicePrice(
      PAINT_SERVICE_ID,
      1,
      "Three Bedrooms Apartments"
    );
    const increment = 90; // difference between tiers
    return threeBedroomPrice + (roomCount - 3) * increment;
  };

  const getDrywallPrice = (): number => {
    switch (drywallRepairType) {
      case "none":
        return 0;
      case "1/4":
        return calculateServicePrice("painting_drywall_replace_quarter");
      case "1/2":
        return calculateServicePrice("painting_drywall_replace_half");
      case "1":
        return calculateServicePrice("painting_drywall_replace_full");
      case "custom": {
        const perSheet = calculateServicePrice("painting_drywall_replace_full");
        return perSheet * customDrywallSheets;
      }
      default:
        return 0;
    }
  };

  const getTotalPrice = (): number => {
    const basePrice = getBasePaintingPrice(rooms);
    const drywallPrice = getDrywallPrice();

    let total = basePrice;

    // Double coating stacks on top of the base painting price
    if (doubleCoating) {
      total += basePrice;
    }

    if (extraPrep) {
      total += EXTRA_PREP_PRICE;
    }

    total += drywallPrice;

    return total;
  };

  const formattedTotal = `$${getTotalPrice().toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Paint Configuration
          </DialogTitle>
          <DialogDescription>
            Customize the details for your paint order.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 md:py-4 space-y-5 md:space-y-6">
          {/* Number of Rooms */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 block">
              Number of Rooms
            </label>
            <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-600 font-medium text-sm md:text-base">
                Total Rooms
              </span>
              <div className="flex items-center gap-3 md:gap-4 bg-white p-1 rounded-md shadow-sm border border-gray-200">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-sm hover:bg-gray-100"
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  disabled={rooms <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold text-base md:text-lg">
                  {rooms}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-sm hover:bg-gray-100"
                  onClick={() => setRooms(rooms + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Extra Prep Option */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 block">
              Additional Options
            </label>
            <button
              onClick={() => setExtraPrep(!extraPrep)}
              className={cn(
                "w-full flex items-center justify-between p-3 md:p-4 rounded-lg border-2 transition-all",
                extraPrep
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              )}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className={cn(
                  "w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-all",
                  extraPrep ? "bg-primary border-primary" : "border-gray-300"
                )}>
                  {extraPrep && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-medium text-sm md:text-base">
                  Include Extra Prep
                </span>
              </div>
            </button>
          </div>

          {/* Double Coating Option */}
          <div className="space-y-3">
            <button
              onClick={() => setDoubleCoating(!doubleCoating)}
              className={cn(
                "w-full flex items-center justify-between p-3 md:p-4 rounded-lg border-2 transition-all",
                doubleCoating
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              )}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className={cn(
                  "w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-all",
                  doubleCoating ? "bg-primary border-primary" : "border-gray-300"
                )}>
                  {doubleCoating && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-medium text-sm md:text-base">
                  Double Coating
                </span>
              </div>
            </button>
          </div>

          {/* Drywall Repairs */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 block">
              Drywall Repairs
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
              {(["1/4", "1/2", "1", "custom"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    setDrywallRepairType((current) =>
                      current === option ? "none" : option
                    )
                  }
                  className={cn(
                    "flex items-center justify-center py-2 px-2 md:p-3 rounded-lg border-2 transition-all font-medium text-xs md:text-sm",
                    drywallRepairType === option
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  )}
                >
                  {option === "custom" ? "Custom" : `${option} Sheet${option === "1" ? "" : "s"}`}
                </button>
              ))}
            </div>
            
            {/* Custom Input Field */}
            {drywallRepairType === "custom" && (
              <div className="mt-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="text-xs font-medium text-gray-600 block mb-2">
                  Number of Sheets
                </label>
                <div className="flex items-center gap-2 md:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 md:h-9 md:w-9"
                    onClick={() => setCustomDrywallSheets(Math.max(1, customDrywallSheets - 1))}
                    disabled={customDrywallSheets <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={customDrywallSheets}
                    onChange={(e) => setCustomDrywallSheets(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center font-semibold text-sm md:text-base"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 md:h-9 md:w-9"
                    onClick={() => setCustomDrywallSheets(customDrywallSheets + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-medium text-gray-700">
              Estimated Painting Total
            </span>
            <span className="text-[11px] md:text-xs text-gray-500">
              Based on rooms plus selected extras (drywall, double coating, extra prep).
            </span>
          </div>
          <span className="text-base md:text-lg font-bold text-primary">
            {formattedTotal}
          </span>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              const totalPrice = getTotalPrice();
              const drywallLabel =
                drywallRepairType === "none"
                  ? "No drywall repairs"
                  : drywallRepairType === "custom"
                  ? `${customDrywallSheets} custom sheet(s) of drywall`
                  : `${drywallRepairType} sheet drywall repair`;

              const details = [
                `${rooms} room${rooms === 1 ? "" : "s"}`,
                extraPrep ? "extra prep" : null,
                doubleCoating ? "double coating" : null,
                drywallLabel,
              ]
                .filter(Boolean)
                .join(" • ");

              onAddToCart({
                serviceId: PAINT_SERVICE_ID,
                name: "Paint",
                price: totalPrice,
                details,
              });
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
          >
            Add to Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
