import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { X, Image as ImageIcon } from "lucide-react";

interface Props {
  product?: Product | null;
  onSave: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<Product["category"]>("tshirt");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setImage(product.image);
      setCategory(product.category);
    }
  }, [product]);

  const handleSubmit = () => {
    if (!name.trim() || !price || !image.trim()) {
      setError("All fields are required.");
      return;
    }
    onSave({ name: name.trim(), price: Number(price), image: image.trim(), category });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-background border border-border w-full max-w-lg mx-4 p-8 animate-fade-in max-h-[90vh] overflow-y-auto">
        <button onClick={onCancel} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>

        <h2 className="font-display text-2xl font-semibold mb-1">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {product ? "Update the product details below." : "Fill in the details to add a new product to your store."}
        </p>

        <div className="space-y-5">
          <div>
            <label className="fashion-label">Product Name</label>
            <input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} className="fashion-input" placeholder="e.g. Classic Black Hoodie" />
          </div>
          <div>
            <label className="fashion-label">Price (NPR)</label>
            <input type="number" value={price} onChange={(e) => { setPrice(e.target.value); setError(""); }} className="fashion-input" placeholder="e.g. 2500" />
          </div>
          <div>
            <label className="fashion-label">Image URL</label>
            <input value={image} onChange={(e) => { setImage(e.target.value); setError(""); }} className="fashion-input" placeholder="https://example.com/image.jpg" />
            {image && (
              <div className="mt-3 border border-border rounded overflow-hidden">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            {!image && (
              <div className="mt-3 border border-dashed border-border rounded h-32 flex items-center justify-center text-muted-foreground/40">
                <div className="text-center">
                  <ImageIcon size={24} className="mx-auto mb-1" />
                  <p className="text-xs">Image preview</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="fashion-label">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as Product["category"])} className="fashion-input">
              <option value="hoodie">Hoodie</option>
              <option value="tshirt">T-Shirt</option>
              <option value="jacket">Jacket</option>
            </select>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={onCancel} className="fashion-btn-outline flex-1 text-xs">Cancel</button>
            <button onClick={handleSubmit} className="fashion-btn-primary flex-1 text-xs">
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
