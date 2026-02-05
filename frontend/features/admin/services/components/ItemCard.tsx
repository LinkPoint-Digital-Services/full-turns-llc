import React from "react";
import NextImage from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/features/manager/components/serviceData";

interface ItemCardProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between border rounded-lg p-3 hover:bg-accent/50 transition-colors gap-3">
      <div className="flex gap-3 flex-1">
        {item.imageUrl && (
          <div className="relative w-14 h-14 sm:w-12 sm:h-12 rounded-md overflow-hidden bg-muted flex-shrink-0 border">
            <NextImage
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{item.name}</p>
          {item.selectionType !== 'checklist' ? (
            <p className="text-sm text-muted-foreground">
              ${item.basePrice.toFixed(2)}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Checklist based
            </p>
          )}
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 items-center">
            <Badge variant="outline" className="text-[9px] px-1 py-0 capitalize">
              {item.selectionType === 'checklist' ? 'Checklist' : 'Individual'}
            </Badge>
            {item.addOns && item.addOns.length > 0 && (
              <p className="text-[10px] text-muted-foreground">
                {item.addOns.length} {item.selectionType === 'checklist' ? 'sub-item' : 'add-on'}{item.addOns.length !== 1 ? 's' : ''}
              </p>
            )}
            {item.allowCustomDetails && (
              <p className="text-[10px] text-blue-600 dark:text-blue-400">
                Custom details
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center self-end sm:self-start">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={onEdit}
          aria-label="Edit item"
        >
          <Pencil size={14} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive/90"
          onClick={onDelete}
          aria-label="Delete item"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}
