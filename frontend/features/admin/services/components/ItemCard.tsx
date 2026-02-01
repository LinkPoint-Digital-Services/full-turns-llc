import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item } from "@/features/manager/components/serviceData";

interface ItemCardProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  return (
    <div className="flex justify-between border rounded-lg p-3 hover:bg-accent/50 transition-colors">
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          ${item.basePrice.toFixed(2)} / {item.measurement}
        </p>
        {item.addOns && item.addOns.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {item.addOns.length} add-on{item.addOns.length !== 1 ? 's' : ''}
          </p>
        )}
        {item.allowCustomDetails && (
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Allows custom details
          </p>
        )}
      </div>

      <div className="flex gap-1 items-start">
        <Button
          size="icon"
          variant="ghost"
          onClick={onEdit}
          aria-label="Edit item"
        >
          <Pencil size={14} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive hover:text-destructive/90"
          onClick={onDelete}
          aria-label="Delete item"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}
