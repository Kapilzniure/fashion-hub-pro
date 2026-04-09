import { Order } from "@/data/products";
import { CheckCircle, Clock, MessageCircle, Phone } from "lucide-react";

interface Props {
  orders: Order[];
  onToggle: (id: string) => void;
}

const STORE_PHONE = "9779800000000";

const DashboardTable = ({ orders, onToggle }: Props) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-lg">
        <ShoppingBagEmpty />
        <p className="text-lg font-display mt-4">No orders yet</p>
        <p className="text-sm mt-1">Orders will appear here when customers place them.</p>
      </div>
    );
  }

  const getWhatsAppLink = (order: Order) => {
    const phone = order.phone || STORE_PHONE;
    return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      `Hi ${order.customerName}! This is Fashion Hub Chitwan. Your order for "${order.productName}" (Size: ${order.size}) is confirmed. Thank you!`
    )}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Customer</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Product</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Size</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Phone</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Message</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Status</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Date</th>
            <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-5 pr-4 font-medium">{o.customerName}</td>
              <td className="py-5 pr-4">{o.productName}</td>
              <td className="py-5 pr-4">{o.size}</td>
              <td className="py-5 pr-4 text-muted-foreground">{o.phone || "—"}</td>
              <td className="py-5 pr-4 text-muted-foreground max-w-[150px] truncate">{o.message || "—"}</td>
              <td className="py-5 pr-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                    o.status === "Completed"
                      ? "bg-success/10 text-success"
                      : "bg-gold/10 text-gold"
                  }`}
                >
                  {o.status === "Completed" ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {o.status}
                </span>
              </td>
              <td className="py-5 pr-4 text-muted-foreground text-xs">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggle(o.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                      o.status === "Pending"
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {o.status === "Pending" ? "✓ Complete" : "Reopen"}
                  </button>
                  {o.phone && (
                    <a
                      href={getWhatsAppLink(o)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded hover:bg-muted"
                      title="Contact on WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function ShoppingBagEmpty() {
  return (
    <svg className="w-12 h-12 mx-auto text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

export default DashboardTable;
