import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useOrders, useProducts } from "@/hooks/useStore";
import AdminSidebar from "@/components/AdminSidebar";
import DashboardTable from "@/components/DashboardTable";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Menu, X, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const { isAdmin, logout } = useAuth();
  const { orders, toggleStatus } = useOrders();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (!isAdmin) return <Navigate to="/admin-login" replace />;

  const handleSave = (data: Omit<Product, "id">) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
      toast.success("Product updated successfully!");
    } else {
      addProduct(data);
      toast.success("Product added successfully!");
    }
    setFormOpen(false);
    setEditProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    toast.success("Product deleted.");
  };

  const handleToggle = (id: string) => {
    toggleStatus(id);
    toast.success("Order status updated.");
  };

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const completedCount = orders.filter((o) => o.status === "Completed").length;

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
        {/* Welcome bar */}
        <div className="mb-8 p-4 bg-muted/50 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            👋 Welcome to your admin panel. You can manage your products and view customer orders here.
          </p>
        </div>

        {tab === "orders" ? (
          <div>
            <div className="mb-8">
              <h1 className="font-display text-3xl font-semibold">Orders</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {orders.length} total — {pendingCount} pending, {completedCount} completed
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 border border-border rounded-lg text-center">
                <p className="text-2xl font-display font-semibold">{orders.length}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Total</p>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <p className="text-2xl font-display font-semibold text-gold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Pending</p>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <p className="text-2xl font-display font-semibold text-success">{completedCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Completed</p>
              </div>
            </div>

            <DashboardTable orders={orders} onToggle={handleToggle} />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-semibold">Manage Products</h1>
                <p className="text-sm text-muted-foreground mt-1">{products.length} products in your store</p>
              </div>
              <button
                onClick={() => { setEditProduct(null); setFormOpen(true); }}
                className="fashion-btn-primary text-xs gap-2"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-lg">
                <p className="text-lg font-display">No products added yet</p>
                <p className="text-sm mt-1">Click "Add Product" to add your first item.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Image</th>
                      <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Name</th>
                      <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Price</th>
                      <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Category</th>
                      <th className="pb-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4">
                          <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" loading="lazy" />
                        </td>
                        <td className="py-4 pr-4 font-medium">{p.name}</td>
                        <td className="py-4 pr-4">NPR {p.price.toLocaleString()}</td>
                        <td className="py-4 pr-4 capitalize">{p.category}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditProduct(p); setFormOpen(true); }}
                              className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="p-2 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              title="Delete"
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
            )}
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

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-background border border-border w-full max-w-sm mx-4 p-8 animate-fade-in text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle size={24} className="text-destructive" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Delete Product?</h3>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="fashion-btn-outline flex-1 text-xs">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 text-xs font-medium uppercase tracking-widest px-6 py-3 bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
