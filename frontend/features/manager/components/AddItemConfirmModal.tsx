"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Item } from "./serviceData";

interface AddItemConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
  onConfirm: () => void;
}

export const AddItemConfirmModal = ({
  open,
  onOpenChange,
  item,
  onConfirm,
}: AddItemConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add service to order?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mt-2">
          {item
            ? `Do you want to add "${item.name}" to your cart?`
            : "Do you want to add this service to your cart?"}
        </p>
        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
