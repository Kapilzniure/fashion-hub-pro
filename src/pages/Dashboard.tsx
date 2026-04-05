import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useOrders, useProducts } from "@/hooks/useStore";
import AdminSidebar from "@/components/AdminSidebar";
import DashboardTable from "@/components/DashboardTable";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Menu, X } from "lucide-react";

const Dashboard = () => {
  const { isAdmin, logout } = useAuth();
  const { orders, toggleStatus } = useOrders();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdmin) return <Navigate to="/admin-login" replace />;

  const handleSave = (data: Omit<Product, "id">) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
      toast.success("Product updated.");
    } else {
      addProduct(data);
      toast.success("Product added.");
    }
    setFormOpen(false);
    setEditProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted.");
  };

  const handleToggle = (id: string) => {
    toggleStatus(id);
    toast.success("Order status updated.");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <AdminSidebar active={tab} onNavigate={(t) => { setTab(t); setSidebarOpen(false); }} onLogout={logout} />
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {tab === "orders" ? (
          <div>
            <div className="mb-8">
              <h1 className="font-display text-3xl font-semibold">Orders</h1>
              <p className="text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
            </div>
            <DashboardTable orders={orders} onToggle={handleToggle} />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-semibold">Products</h1>
                <p className="text-sm text-muted-foreground mt-1">{products.length} products</p>
              </div>
              <button
                onClick={() => { setEditProduct(null); setFormOpen(true); }}
                className="fashion-btn-primary text-xs gap-2"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Image</th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Name</th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Price</th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Category</th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-widest text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4">
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" loading="lazy" />
                      </td>
                      <td className="py-3 pr-4 font-medium">{p.name}</td>
                      <td className="py-3 pr-4">NPR {p.price.toLocaleString()}</td>
                      <td className="py-3 pr-4 capitalize">{p.category}</td>
                      <td className="py-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => { setEditProduct(p); setFormOpen(true); }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {formOpen && (
        <ProductForm
          product={editProduct}
          onSave={handleSave}
          onCancel={() => { setFormOpen(false); setEditProduct(null); }}
        />
      )}
    </div>
  );
};

export default Dashboard;
