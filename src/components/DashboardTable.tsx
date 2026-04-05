import { Order } from "@/data/products";
import { CheckCircle, Clock } from "lucide-react";

interface Props {
  orders: Order[];
  onToggle: (id: string) => void;
}

const DashboardTable = ({ orders, onToggle }: Props) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg font-display">No orders yet</p>
        <p className="text-sm mt-1">Orders will appear here when customers place them.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Product</th>
            <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Customer</th>
            <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Size</th>
            <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Status</th>
            <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Date</th>
            <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-4 pr-4 font-medium">{o.productName}</td>
              <td className="py-4 pr-4">{o.customerName}</td>
              <td className="py-4 pr-4">{o.size}</td>
              <td className="py-4 pr-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    o.status === "Completed"
                      ? "bg-success/10 text-success"
                      : "bg-gold/10 text-gold"
                  }`}
                >
                  {o.status === "Completed" ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {o.status}
                </span>
              </td>
              <td className="py-4 pr-4 text-muted-foreground">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4">
                <button
                  onClick={() => onToggle(o.id)}
                  className="text-xs font-medium uppercase tracking-wider hover:text-foreground text-muted-foreground transition-colors underline underline-offset-4"
                >
                  {o.status === "Pending" ? "Complete" : "Reopen"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
