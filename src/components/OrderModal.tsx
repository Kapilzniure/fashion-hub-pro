import { useState } from "react";
import { Product } from "@/data/products";
import { X } from "lucide-react";

interface Props {
  product: Product;
  onClose: () => void;
  onConfirm: (data: { productName: string; customerName: string; size: string }) => void;
}

const OrderModal = ({ product, onClose, onConfirm }: Props) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !size) {
      setError("Please fill in all fields.");
      return;
    }
    onConfirm({ productName: product.name, customerName: name.trim(), size });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-md mx-4 p-8 animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>

        <h2 className="font-display text-2xl font-semibold mb-1">Place Order</h2>
        <p className="text-sm text-muted-foreground mb-6">Complete your order details below.</p>

        <div className="space-y-5">
          <div>
            <label className="fashion-label">Product</label>
            <input type="text" value={product.name} readOnly className="fashion-input bg-muted" />
          </div>

          <div>
            <label className="fashion-label">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Enter your full name"
              className="fashion-input"
            />
          </div>

          <div>
            <label className="fashion-label">Size</label>
            <select
              value={size}
              onChange={(e) => { setSize(e.target.value); setError(""); }}
              className="fashion-input"
            >
              <option value="">Select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="fashion-btn-outline flex-1 text-xs">
              Cancel
            </button>
            <button onClick={handleSubmit} className="fashion-btn-primary flex-1 text-xs">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
