import { useState } from "react";
import { Product } from "@/data/products";
import { X, MessageCircle } from "lucide-react";

interface Props {
  product: Product;
  onClose: () => void;
  onConfirm: (data: {
    productName: string;
    customerName: string;
    size: string;
    phone: string;
    message: string;
  }) => void;
}

const STORE_PHONE = "9779800000000";

const OrderModal = ({ product, onClose, onConfirm }: Props) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !size) {
      setError("Please enter your name and select a size.");
      return;
    }
    onConfirm({
      productName: product.name,
      customerName: name.trim(),
      size,
      phone: phone.trim(),
      message: message.trim(),
    });
    setConfirmed(true);
  };

  const whatsappLink = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
    `Hi! I'd like to order:\n\nProduct: ${product.name}\nSize: ${size || "—"}\nName: ${name || "—"}\n\nPlease confirm my order. Thank you!`
  )}`;

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-background border border-border w-full max-w-md mx-4 p-8 animate-fade-in text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">Order Placed!</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Thank you, <span className="font-medium text-foreground">{name}</span>!
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We will contact you shortly to confirm your order for <span className="font-medium text-foreground">{product.name}</span> (Size {size}).
          </p>
          <div className="space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="fashion-btn-primary w-full text-xs gap-2 justify-center inline-flex"
            >
              <MessageCircle size={14} /> Chat on WhatsApp
            </a>
            <button onClick={onClose} className="fashion-btn-outline w-full text-xs">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-md mx-4 p-8 animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>

        <h2 className="font-display text-2xl font-semibold mb-1">Place Order</h2>
        <p className="text-sm text-muted-foreground mb-6">Fill in your details and we'll contact you to confirm.</p>

        <div className="space-y-5">
          <div>
            <label className="fashion-label">Product</label>
            <input type="text" value={`${product.name} — NPR ${product.price.toLocaleString()}`} readOnly className="fashion-input bg-muted" />
          </div>

          <div>
            <label className="fashion-label">Your Name <span className="text-destructive">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Enter your full name"
              className="fashion-input"
            />
          </div>

          <div>
            <label className="fashion-label">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98XXXXXXXX (optional)"
              className="fashion-input"
            />
          </div>

          <div>
            <label className="fashion-label">Size <span className="text-destructive">*</span></label>
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

          <div>
            <label className="fashion-label">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any special requests? (optional)"
              rows={2}
              className="fashion-input resize-none"
            />
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

          <div className="text-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle size={12} /> Or order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
