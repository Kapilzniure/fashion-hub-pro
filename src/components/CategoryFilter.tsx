const categories = [
  { key: "all", label: "All" },
  { key: "hoodie", label: "Hoodies" },
  { key: "tshirt", label: "T-Shirts" },
  { key: "jacket", label: "Jackets" },
] as const;

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

const CategoryFilter = ({ active, onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`px-5 py-2.5 text-xs font-medium uppercase tracking-widest border transition-all duration-300 ${
            active === c.key
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:border-foreground"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
