import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

interface DeleteConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Accessible Dialog Title */}
        <DialogTitle>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <div className="px-6 pt-6 pb-0 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <Trash2 className="h-6 w-6 text-primary" />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-6 border-t border-gray-200" />

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5">
          <Button
            variant="outline"
            className="flex-1 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-lg bg-primary hover:bg-primary-dark text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
