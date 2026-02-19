/* eslint-disable @next/next/no-img-element */
import {ShoppingCart, X, ImagePlus, Loader2} from "lucide-react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {OrderItem} from "../types/order.types";
import {Input} from "@/components/ui/input";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: OrderItem[];
  cartTotal: number;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (files?: File[], notes?: string, googleDriveLink?: string) => void;
}

export const CartModal = ({
  open,
  onOpenChange,
  cartItems,
  cartTotal,
  onRemoveItem,
  onCheckout,
}: CartModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const totalFiles = selectedFiles.length + files.length;
      
      // Limit to 3 images maximum
      if (totalFiles > 3) {
        toast.warning(`You can only upload a maximum of 3 images. You already have ${selectedFiles.length} selected.`);
        e.target.value = ''; // Reset input
        return;
      }
      
      setSelectedFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
    e.target.value = ''; // Reset input to allow re-selecting same file
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutClick = async () => {
    setIsSubmitting(true);
    try {
      await onCheckout(
        selectedFiles.length > 0 ? selectedFiles : undefined,
        notes,
        link || undefined
      );
      // Reset state if successful
      setSelectedFiles([]);
      setPreviews([]);
      setNotes("");
      setLink(null);
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 px-1">
          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="pr-4 flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      {item.name}
                    </p>
                    {item.details && (
                      <p className="text-sm text-gray-600 mb-2">
                        {item.details}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-primary whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Image Upload Section - Optional */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Images or paste a Google Drive Link (Optional)
                <p className="text-xs text-gray-500 font-normal">
                  Upload any relevant photos for this order
                </p>
              </label>

              {selectedFiles.length == 0 && previews.length == 0 && (
                <Input
                  onChange={(e) => setLink(e.target.value)}
                  className="mt-3 mb-5"
                  placeholder="Google Drive Link"
                ></Input>
              )}

              <div className="flex flex-wrap gap-3 mb-3">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200 bg-gray-100 group"
                  >
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white rounded-full text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {!link && (
                  <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
                    <ImagePlus className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-500">Add Photo</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>

          <Input
            onChange={(e) => setNotes(e.target.value)}
            className="mt-3 mb-5"
            placeholder="Notes"
          ></Input>
        </div>

        <div className="border-t space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900 mt-6">
              Total:
            </span>
            <span className="text-2xl font-bold text-primary">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
              disabled={cartItems.length === 0 || isSubmitting}
            >
              Back
            </Button>
            <Button
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto"
              disabled={cartItems.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
