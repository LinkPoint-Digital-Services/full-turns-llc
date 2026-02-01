import React from "react";
import { Item } from "@/features/manager/components/serviceData";
import { ItemCard } from "./ItemCard";

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

export function ItemList({ items, onEdit, onDelete }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No items yet. Click "Add Item" to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ItemCard
          key={item.itemId}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.itemId)}
        />
      ))}
    </div>
  );
}
