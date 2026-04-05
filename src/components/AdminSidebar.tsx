import { Package, ShoppingBag, LogOut } from "lucide-react";

interface Props {
  active: "orders" | "products";
  onNavigate: (tab: "orders" | "products") => void;
  onLogout: () => void;
}

const AdminSidebar = ({ active, onNavigate, onLogout }: Props) => {
  const items = [
    { key: "orders" as const, label: "Orders", icon: ShoppingBag },
    { key: "products" as const, label: "Products", icon: Package },
  ];

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col shrink-0">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="font-display text-lg font-semibold text-sidebar-primary">Admin Panel</h2>
        <p className="text-xs text-sidebar-foreground/50 mt-1">Fashion Hub Chitwan</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors ${
              active === item.key
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
