import { Product } from "@/data/products";

interface Props {
  product: Product;
  onOrder: (product: Product) => void;
}

const ProductCard = ({ product, onOrder }: Props) => {
  return (
    <div className="fashion-card group">
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
        <p className="text-sm font-medium">NPR {product.price.toLocaleString()}</p>
        <button
          onClick={() => onOrder(product)}
          className="fashion-btn-primary w-full text-xs mt-2"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
