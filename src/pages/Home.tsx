import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-fashion.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Fashion Hub Chitwan"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={900}
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-primary-foreground/70 text-xs uppercase tracking-[0.3em] mb-4 animate-fade-in">
            Chitwan's Premier Fashion Destination
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] animate-fade-in">
            Fashion Hub
          </h1>
          <p className="text-primary-foreground/60 text-lg mt-4 font-light animate-fade-in">
            Curated streetwear &amp; premium essentials
          </p>
          <Link
            to="/products"
            className="fashion-btn-primary mt-8 inline-flex bg-primary-foreground text-primary hover:opacity-90 animate-fade-in"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-16">
          Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Hoodies", desc: "Cozy oversized essentials" },
            { name: "T-Shirts", desc: "Everyday premium basics" },
            { name: "Jackets", desc: "Statement outerwear pieces" },
          ].map((cat) => (
            <Link
              key={cat.name}
              to="/products"
              className="group border border-border p-10 text-center hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              <h3 className="font-display text-2xl font-medium mb-2">{cat.name}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fashion Hub Chitwan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
