import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Service} from "@/features/manager/components/serviceData";
import {useState, useEffect} from "react";

export function ServiceModal({
  service,
  onSave,
  onClose,
}: {
  service: Service;
  onSave: (s: Service) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Service>(service);

  useEffect(() => {
    setDraft(service);
  }, [service]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {service._id ? "Edit Service" : "New Service"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Service Name */}
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Input
              placeholder="Service name"
              value={draft.serviceName}
              onChange={(e) =>
                setDraft({...draft, serviceName: e.target.value})
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(draft)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
