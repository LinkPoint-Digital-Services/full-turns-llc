import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PunchOutConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PunchOutConfigModal = ({
  open,
  onOpenChange,
}: PunchOutConfigModalProps) => {
  const [customOrder, setCustomOrder] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Punch-Outs Service Configuration
          </DialogTitle>
          <DialogDescription>
            Describe your custom punch-out service requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 block">
              Custom Order Details
            </label>
            <Textarea
              placeholder="Enter your custom order details here..."
              value={customOrder}
              onChange={(e) => setCustomOrder(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <p className="text-xs text-gray-500">
              Please provide detailed information about the punch-out services you need.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // TODO: Handle add to order logic
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
            disabled={!customOrder.trim()}
          >
            Add to Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
