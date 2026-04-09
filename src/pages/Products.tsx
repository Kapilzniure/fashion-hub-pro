import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import OrderModal from "@/components/OrderModal";
import { useProducts, useOrders } from "@/hooks/useStore";
import { Product } from "@/data/products";
import { toast } from "sonner";

const Products = () => {
  const { products } = useProducts();
  const { addOrder } = useOrders();
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = category === "all" ? products : products.filter((p) => p.category === category);

  const handleOrder = (data: {
    productName: string;
    customerName: string;
    size: string;
    phone: string;
    message: string;
  }) => {
    addOrder(data);
    toast.success("Order placed successfully!");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Shop</h1>
          <p className="text-muted-foreground">Browse our curated collection of premium streetwear.</p>
        </div>

        <div className="mb-10">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={setSelectedProduct} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No products in this category.</p>
        )}
      </div>

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleOrder}
        />
      )}
    </div>
  );
};

export default Products;
