import { useState, useEffect, useCallback } from "react";
import { Product, Order, OrderStatus, defaultProducts } from "@/data/products";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage("fh_products", defaultProducts)
  );

  useEffect(() => {
    localStorage.setItem("fh_products", JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: "p" + Date.now() }]);
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { products, addProduct, updateProduct, deleteProduct };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage("fh_orders", [])
  );

  useEffect(() => {
    localStorage.setItem("fh_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((o: Omit<Order, "id" | "status" | "createdAt">) => {
    const order: Order = {
      ...o,
      id: "o" + Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }, []);

  // Keep backward compat
  const toggleStatus = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next: OrderStatus =
          o.status === "Pending" ? "Contacted" :
          o.status === "Contacted" ? "Delivered" : "Pending";
        return { ...o, status: next };
      })
    );
  }, []);

  return { orders, addOrder, updateStatus, toggleStatus };
}

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("fh_admin") === "true");

  const login = (email: string, password: string): boolean => {
    if (email === "admin@fashion.com" && password === "123456") {
      localStorage.setItem("fh_admin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("fh_admin");
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}
