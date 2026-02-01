import React from "react";
import { ChevronDown, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service, Item } from "@/features/manager/components/serviceData";
import { ItemList } from "@/features/admin/services/components/ItemList";

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
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <button
          onClick={onToggle}
          className="flex gap-2 items-center hover:opacity-80 transition-opacity"
        >
          <ChevronDown
            className={`transition-transform duration-200 ${isOpen && "rotate-180"}`}
            size={16}
          />
          <CardTitle className="text-base">
            {service.serviceName}
          </CardTitle>
        </button>

        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onEdit}
            aria-label="Edit service"
          >
            <Pencil size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:text-destructive/90"
            onClick={onDelete}
            aria-label="Delete service"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-3">
          <Button
            variant="link"
            className="px-0 text-primary"
            onClick={onAddItem}
          >
            <Plus size={14} /> Add Item
          </Button>

          <ItemList
            items={items}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        </CardContent>
      )}
    </Card>
  );
}
