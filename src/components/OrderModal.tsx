import { useState } from "react";
import { Product, STORE_PHONE } from "@/data/products";
import { X, MessageCircle, ShieldCheck, Truck, Phone } from "lucide-react";

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
    `Hi! I'd like to order:\n\nProduct: ${product.name}\nPrice: Rs. ${product.price.toLocaleString()}\nSize: ${size || "—"}\nName: ${name || "—"}\n\nPlease confirm my order. Thank you!`
  )}`;

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-background border border-border w-full max-w-md mx-4 p-8 animate-fade-in text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">Order Placed!</h2>
          <p className="text-sm text-muted-foreground mb-1">
            Thank you, <span className="font-medium text-foreground">{name}</span>!
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Your order for <span className="font-medium text-foreground">{product.name}</span> (Size {size}) has been received.
          </p>
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-muted-foreground" />
              <span>We will contact you shortly to confirm</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck size={14} className="text-muted-foreground" />
              <span>Cash on Delivery available</span>
            </div>
          </div>
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
      <div className="relative bg-background border border-border w-full max-w-md mx-4 p-8 animate-fade-in max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>

        <h2 className="font-display text-2xl font-semibold mb-1">Place Order</h2>
        <p className="text-sm text-muted-foreground mb-5">Fill in your details and we'll contact you to confirm.</p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1.5 rounded-full">
            <Truck size={11} /> Cash on Delivery
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1.5 rounded-full">
            <ShieldCheck size={11} /> Safe & Trusted
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1.5 rounded-full">
            <Phone size={11} /> Fast Response
          </span>
        </div>

        <div className="space-y-5">
          <div>
            <label className="fashion-label">Product</label>
            <input type="text" value={`${product.name} — Rs. ${product.price.toLocaleString()}`} readOnly className="fashion-input bg-muted" />
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
              placeholder="98XXXXXXXX (optional, for faster contact)"
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

          <div className="text-center pt-1">
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
