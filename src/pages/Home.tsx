import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useProducts } from "@/hooks/useStore";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-fashion.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import { STORE_PHONE, STORE_INSTAGRAM, STORE_LOCATION, STORE_DISPLAY_PHONE } from "@/data/products";
import {
  Truck,
  ShieldCheck,
  BadgeDollarSign,
  Smartphone,
  Star,
  Instagram,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  MapPin,
  Phone,
  Store,
} from "lucide-react";

const Home = () => {
  const { products } = useProducts();
  const trending = products.slice(0, 4);
  const bestSellers = products.filter((p) => ["p1", "p3", "p6"].includes(p.id));
  const newArrivals = products.filter((p) => ["p5", "p7", "p8"].includes(p.id));

  const reviews = [
    { name: "Aarav S.", text: "Amazing quality hoodies! Best in Chitwan.", rating: 5 },
    { name: "Priya K.", text: "Fast delivery and great fit. Love the jackets!", rating: 5 },
    { name: "Rohan M.", text: "Affordable prices for premium streetwear. Highly recommend.", rating: 5 },
    { name: "Sita D.", text: "Ordered twice already. The t-shirts are super comfortable.", rating: 4 },
  ];

  const steps = [
    { step: "01", title: "Browse Collection", desc: "Explore our curated streetwear" },
    { step: "02", title: "Place Your Order", desc: "Select size & confirm details" },
    { step: "03", title: "We Contact You", desc: "Order confirmation via call/message" },
    { step: "04", title: "Get It Delivered", desc: "Fast delivery across Chitwan" },
  ];

  const whyUs = [
    { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery in Chitwan" },
    { icon: ShieldCheck, title: "Premium Quality", desc: "Handpicked fabrics & fits" },
    { icon: BadgeDollarSign, title: "Affordable Price", desc: "Best value streetwear" },
    { icon: Smartphone, title: "Easy Ordering", desc: "Order in under 60 seconds" },
  ];

  const categories = [
    { name: "Hoodies", desc: "Cozy oversized essentials", filter: "hoodie", image: products.find(p => p.category === "hoodie")?.image },
    { name: "T-Shirts", desc: "Everyday premium basics", filter: "tshirt", image: products.find(p => p.category === "tshirt")?.image },
    { name: "Jackets", desc: "Statement outerwear pieces", filter: "jacket", image: products.find(p => p.category === "jacket")?.image },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Fashion Hub Chitwan"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={900}
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-primary-foreground/60 text-xs uppercase tracking-[0.4em] mb-6 animate-fade-in">
            Chitwan's #1 Streetwear Destination
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.05] animate-fade-in">
            Elevate Your
            <br />
            <span className="italic font-normal">Street Style</span>
          </h1>
          <p className="text-primary-foreground/50 text-base md:text-lg mt-6 font-light max-w-xl mx-auto animate-fade-in">
            Premium hoodies, tees &amp; jackets — curated for the bold.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link
              to="/products"
              className="fashion-btn bg-primary-foreground text-primary hover:opacity-90 gap-2"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <a
              href="#categories"
              className="fashion-btn border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Explore Categories
            </a>
          </div>
          <p className="text-primary-foreground/40 text-xs mt-10 tracking-widest uppercase animate-fade-in">
            1,000+ Happy Customers &nbsp;·&nbsp; Trusted Since 2022
          </p>
        </div>
      </section>

      {/* ═══════════ ABOUT / TRUST STRIP ═══════════ */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><Truck size={16} /> Cash on Delivery</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} /> Premium Quality</span>
          <span className="inline-flex items-center gap-2"><Phone size={16} /> Fast Response</span>
          <span className="inline-flex items-center gap-2"><Store size={16} /> Local Store — Chitwan</span>
        </div>
      </section>

      {/* ═══════════ TRENDING NOW ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="fashion-label">What's Hot</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Trending Now</h2>
          </div>
          <Link to="/products" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={() => {}} />
          ))}
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section id="categories" className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fashion-label">Collections</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                className="group relative aspect-[3/4] overflow-hidden bg-muted"
              >
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
                  <h3 className="font-display text-3xl font-semibold mb-2">{cat.name}</h3>
                  <p className="text-sm text-primary-foreground/70">{cat.desc}</p>
                  <span className="mt-4 text-xs uppercase tracking-widest border-b border-primary-foreground/50 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BEST SELLERS ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="fashion-label">Customer Favorites</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Best Sellers</h2>
          </div>
          <Link to="/products" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={() => {}} />
          ))}
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fashion-label">The Fashion Hub Promise</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="font-display text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LIFESTYLE / BRAND ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fashion-label">Our Vibe</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">The Fashion Hub Style</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="row-span-2 overflow-hidden">
              <img src={lifestyle1} alt="Streetwear style" loading="lazy" width={640} height={800} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden">
              <img src={lifestyle2} alt="Casual fashion" loading="lazy" width={640} height={800} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden">
              <img src={lifestyle3} alt="Street fashion group" loading="lazy" width={640} height={800} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="md:col-span-2 bg-primary text-primary-foreground flex items-center justify-center p-10">
              <div className="text-center">
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">Bold. Minimal. Authentic.</h3>
                <p className="text-primary-foreground/60 text-sm max-w-md mx-auto">
                  We don't follow trends — we set them. Premium streetwear crafted for those who dare to stand out.
                </p>
                <Link to="/products" className="fashion-btn border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 mt-6 inline-flex">
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ NEW ARRIVALS ═══════════ */}
      <section className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="fashion-label">Just Dropped</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">New Arrivals</h2>
            </div>
            <Link to="/products" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} onOrder={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW TO ORDER ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fashion-label">Simple & Fast</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">How to Order</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                <span className="font-display text-5xl font-bold text-muted-foreground/20">{s.step}</span>
                <h3 className="font-display text-lg font-medium mt-2 mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={20} className="hidden md:block absolute top-8 -right-4 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section className="border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fashion-label">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="border border-border p-6 space-y-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-foreground text-foreground" />
                  ))}
                  {Array.from({ length: 5 - r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-muted-foreground/30" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">"{r.text}"</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT / SOCIAL ═══════════ */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary-foreground/50 text-xs uppercase tracking-[0.3em] mb-4">Get In Touch</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Contact Us</h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Fashion Hub Chitwan offers stylish and affordable fashion for everyday wear. Reach out anytime!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-primary-foreground/20 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <p className="text-sm font-medium mb-1">Phone</p>
              <p className="text-primary-foreground/60 text-sm">{STORE_DISPLAY_PHONE}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-primary-foreground/20 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <p className="text-sm font-medium mb-1">Location</p>
              <p className="text-primary-foreground/60 text-sm">{STORE_LOCATION}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-primary-foreground/20 flex items-center justify-center">
                <Instagram size={20} />
              </div>
              <p className="text-sm font-medium mb-1">Instagram</p>
              <a href={STORE_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">@fashionhubchitwan</a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <a href={STORE_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
              <Instagram size={22} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href={`https://wa.me/${STORE_PHONE}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
              <MessageCircle size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-display text-xl font-semibold mb-3">
                Fashion Hub <span className="text-muted-foreground font-normal">Chitwan</span>
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Chitwan's premier streetwear destination. Premium hoodies, tees &amp; jackets curated for the bold.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-medium mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <Link to="/products" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
                <a href="#categories" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-medium mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">TikTok</a>
                <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Fashion Hub Chitwan. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
