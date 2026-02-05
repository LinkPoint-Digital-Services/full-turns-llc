import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Item, MEASUREMENTS } from "@/features/manager/components/serviceData";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Plus, Trash2 } from "lucide-react";

export function ItemModal({
  item,
  onSave,
  onClose,
}: {
  item: Item;
  onSave: (i: Item) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Item>(item);

  // Sync draft when item changes (if modal is reused without unmounting, though key usually handles this)
  useEffect(() => {
    setDraft(item);
  }, [item]);

  const handleAddOnAdd = () => {
    setDraft((prev) => ({
      ...prev,
      addOns: [
        ...(prev.addOns || []),
        { addOnsId: `addon_${crypto.randomUUID()}`, name: "", price: 0 },
      ],
    }));
  };

  const handleAddOnChange = (
    index: number,
    field: "name" | "price",
    value: string | number
  ) => {
    setDraft((prev) => {
      const newAddOns = [...(prev.addOns || [])];
      if (field === "price") {
        newAddOns[index] = { ...newAddOns[index], price: Number(value) };
      } else {
        newAddOns[index] = { ...newAddOns[index], name: String(value) };
      }
      return { ...prev, addOns: newAddOns };
    });
  };

  const handleAddOnDelete = (index: number) => {
    setDraft((prev) => {
      const newAddOns = [...(prev.addOns || [])];
      newAddOns.splice(index, 1);
      return { ...prev, addOns: newAddOns };
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-2">
            <Label>Item Name</Label>
            <Input
              placeholder="Item name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>

          {/* Selection Type */}
          <div className="space-y-2">
            <Label>Selection Type</Label>
            <Select
              value={draft.selectionType || "individual"}
              onValueChange={(v) =>
                setDraft({ ...draft, selectionType: v as Item["selectionType"] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Item</SelectItem>
                <SelectItem value="checklist">Checklist (of multiple sub-items)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground">
              {draft.selectionType === "checklist" 
                ? "This item will be displayed as a checklist group. Add specific tasks below." 
                : "This item will be shown as a standard selectable card."}
            </p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Item Image</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                {draft.imageUrl ? (
                  <NextImage
                    src={draft.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-xs text-center p-2">
                    No image selected
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setDraft({ ...draft, imageUrl: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="cursor-pointer"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Click to upload a photo from your device.
                </p>
              </div>
              {draft.imageUrl && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive"
                  onClick={() => setDraft({ ...draft, imageUrl: "" })}
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Base Price & Measurement */}
          {draft.selectionType !== 'checklist' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Base Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.basePrice}
                  onChange={(e) =>
                    setDraft({ ...draft, basePrice: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Measurement</Label>
                <Select
                  value={draft.measurement}
                  onValueChange={(v) =>
                    setDraft({ ...draft, measurement: v as Item["measurement"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select measurement" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEASUREMENTS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Custom Details Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="customDetails"
              checked={draft.allowCustomDetails ?? false}
              onCheckedChange={(v) =>
                setDraft({ ...draft, allowCustomDetails: Boolean(v) })
              }
            />
            <Label htmlFor="customDetails">Allow custom details / notes</Label>
          </div>

          {/* Notes / Details Input */}
          {draft.allowCustomDetails && (
            <div className="space-y-2 pl-6">
              <Label>Details / Notes</Label>
              <Input
                placeholder="Enter details or notes regarding this item..."
                value={draft.notes || ""}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              />
            </div>
          )}

          {/* Add-ons Section */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold">
                {draft.selectionType === 'checklist' ? 'Checklist Sub-items' : 'Tailored Add-ons'}
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddOnAdd}
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>

            {(!draft.addOns || draft.addOns.length === 0) && (
              <p className="text-sm text-muted-foreground italic">
                {draft.selectionType === 'checklist' 
                  ? 'No sub-items defined for this checklist yet.' 
                  : 'No add-ons tailored for this item.'}
              </p>
            )}

            <div className="space-y-2">
              {draft.addOns?.map((addon, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    placeholder={draft.selectionType === 'checklist' ? "Sub-item name" : "Name"}
                    className="flex-1"
                    value={addon.name}
                    onChange={(e) =>
                      handleAddOnChange(idx, "name", e.target.value)
                    }
                  />
                  <div className="w-24">
                    <Input
                      type="number"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      value={addon.price}
                      onChange={(e) =>
                        handleAddOnChange(idx, "price", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive shrink-0"
                    onClick={() => handleAddOnDelete(idx)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(draft)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
