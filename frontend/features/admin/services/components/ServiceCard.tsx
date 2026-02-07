import React from "react";
import {ChevronDown, Pencil, Trash2, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Service, Item} from "@/features/manager/components/serviceData";
import {ItemList} from "@/features/admin/services/components/ItemList";

interface ServiceCardProps {
  service: Service;
  items: Item[];
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddItem: () => void;
  onEditItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
}

export function ServiceCard({
  service,
  items,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div
        onClick={onToggle}
        className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <div className="flex gap-3 items-center">
          <ChevronDown
            className={`transition-transform duration-200 shrink-0 ${isOpen && "rotate-180"}`}
            size={18}
          />
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <CardTitle className="text-base font-semibold">
              {service.serviceName}
            </CardTitle>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex gap-1 self-end md:self-center mt-2 md:mt-0"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={onEdit}
            className="h-8 w-8"
            aria-label="Edit service"
          >
            <Pencil size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive/90"
            onClick={onDelete}
            aria-label="Delete service"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {isOpen && (
        <CardContent className="space-y-3">
          <Button
            variant="link"
            className="px-0 text-primary"
            onClick={onAddItem}
          >
            <Plus size={14} /> Add Item
          </Button>

          <ItemList items={items} onEdit={onEditItem} onDelete={onDeleteItem} />
        </CardContent>
      )}
    </Card>
  );
}
