import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Item, formatPrice } from "./serviceData";
import NextImage from "next/image";

interface ServiceItemConfigModalProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (item: {
    serviceId: string;
    name: string;
    price: number;
    details: string;
  }) => void;
}

export const ServiceItemConfigModal = ({
  item,
  open,
  onOpenChange,
  onAddToCart,
}: ServiceItemConfigModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customDetails, setCustomDetails] = useState("");

  
  useEffect(() => {
    const resetState = () => {
      setQuantity(1);
      setSelectedAddOns([]);
      setCustomDetails("");
    };

    if (!open) resetState();
  }, [open]);

  if (!item) return null;

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    if (item.selectionType === 'checklist') {
      let total = 0; // Base price is removed for checklists
      if (item.addOns) {
        item.addOns.forEach((addOn) => {
          if (selectedAddOns.includes(addOn.addOnsId)) {
            total += addOn.price;
          }
        });
      }
      return total;
    }

    let total = item.basePrice * quantity;
    if (item.addOns) {
      item.addOns.forEach((addOn) => {
        if (selectedAddOns.includes(addOn.addOnsId)) {
          total += addOn.price * quantity;
        }
      });
    }
    return total;
  };

  const handleAddToOrder = () => {
    const total = calculateTotal();
    
    // Construct details string
    let details = "";
    if (item.selectionType !== 'checklist' && item.measurement !== "fixed") {
      details += `Quantity: ${quantity} ${item.measurement}`;
    }
    
    if (selectedAddOns.length > 0 && item.addOns) {
      const addOnNames = item.addOns
        .filter((a) => selectedAddOns.includes(a.addOnsId))
        .map((a) => a.name)
        .join(", ");
      
      const label = item.selectionType === 'checklist' ? "Included Items" : "Add-ons";
      details += details ? `\n${label}: ${addOnNames}` : `${label}: ${addOnNames}`;
    }

    if (customDetails.trim()) {
       details += details ? `\nNote: ${customDetails}` : `Note: ${customDetails}`;
    }

    onAddToCart({
      serviceId: item.itemId,
      name: item.name,
      price: total,
      details: details,
    });
    
    // Reset and close
    setQuantity(1);
    setSelectedAddOns([]);
    setCustomDetails("");
    onOpenChange(false);
  };

  const showQuantityInput = item.selectionType !== 'checklist' && item.measurement !== "fixed" && item.measurement !== "varies";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          {item.imageUrl && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-50 mb-4 border">
              <NextImage
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            Configure your service options below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {item.selectionType !== 'checklist' && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Base Price:</span>
              {item.measurement !== "varies" ? (
                <span className="font-medium">
                  {formatPrice(item.basePrice)}{" "}
                  {item.measurement !== "fixed" && `per ${item.measurement}`}
                </span>
              ) : (
                <span className="font-medium">
                  {formatPrice(item.basePrice)}{" "}
                  {item.measurement}
                </span>
              )}
            </div>
          )}

          {showQuantityInput && (
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity ({item.measurement})</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              />
            </div>
          )}

          {item.addOns && item.addOns.length > 0 && (
            <div className="space-y-3">
              <Label>
                {item.selectionType === 'checklist' ? 'Select Items' : 'Add-ons'}
              </Label>
              <div className="space-y-2 border rounded-lg p-3 bg-gray-50/30">
                {item.addOns.map((addon) => (
                  <div
                    key={addon.addOnsId}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={addon.addOnsId}
                      checked={selectedAddOns.includes(addon.addOnsId)}
                      onCheckedChange={() => handleAddOnToggle(addon.addOnsId)}
                    />
                    <label
                      htmlFor={addon.addOnsId}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 flex justify-between"
                    >
                      <span>{addon.name}</span>
                      <span className="text-gray-500">
                        +{formatPrice(addon.price)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.allowCustomDetails && (
            <div className="space-y-2">
              <Label htmlFor="details">Custom Details / Notes</Label>
              <Textarea
                id="details"
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                placeholder="Describe any specific requirements..."
                className="resize-none"
              />
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold text-lg">Total</span>
            <span className="font-bold text-xl text-primary">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddToOrder} disabled={quantity <= 0}>
            Add to Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
