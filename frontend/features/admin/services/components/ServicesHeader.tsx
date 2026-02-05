import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesHeaderProps {
  onAddService: () => void;
}

export function ServicesHeader({ onAddService }: ServicesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Services Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage service categories and their items
        </p>
      </div>
      <Button onClick={onAddService}>
        <Plus size={16} className="mr-2" />
        Add Service
      </Button>
    </div>
  );
}
