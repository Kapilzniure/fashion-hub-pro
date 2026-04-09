import { Product, STORE_PHONE } from "@/data/products";
import { MessageCircle } from "lucide-react";

interface Props {
  product: Product;
  onOrder: (product: Product) => void;
}

const ProductCard = ({ product, onOrder }: Props) => {
  const whatsappLink = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
    `Hi! I'm interested in: ${product.name} (Rs. ${product.price.toLocaleString()}). Can I order?`
  )}`;

  return (
    <div className="fashion-card group relative">
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 ${
          product.badge === "Best Seller" ? "bg-primary text-primary-foreground" :
          product.badge === "Trending" ? "bg-gold text-gold-foreground" :
          "bg-foreground/80 text-background"
        }`}>
          {product.badge}
        </span>
      )}
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-medium leading-tight">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Rs. {product.price.toLocaleString()}</p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">Rs. {product.originalPrice.toLocaleString()}</p>
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onOrder(product)}
            className="fashion-btn-primary flex-1 text-xs"
          >
            Order Now
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fashion-btn-outline px-3 text-xs"
            title="Order via WhatsApp"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
