import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/#categories", label: "Categories", isHash: true },
  ];

  const isHome = pathname === "/";
  const navBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-md border-b border-border"
    : "bg-transparent border-b border-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight font-semibold">
          <span className={scrolled || !isHome ? "text-foreground" : "text-primary-foreground"}>Fashion Hub</span>{" "}
          <span className={scrolled || !isHome ? "text-muted-foreground" : "text-primary-foreground/60"}>Chitwan</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            l.isHash ? (
              <a
                key={l.label}
                href={l.to}
                className={`text-xs font-medium uppercase tracking-widest transition-colors hover:text-foreground ${
                  scrolled || !isHome ? "text-muted-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs font-medium uppercase tracking-widest transition-colors ${
                  scrolled || !isHome
                    ? pathname === l.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    : pathname === l.to ? "text-primary-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {l.label}
              </Link>
            )
          ))}
          <Link
            to="/admin-login"
            className={`text-[10px] font-medium uppercase tracking-widest transition-colors ${
              scrolled || !isHome ? "text-muted-foreground/50 hover:text-muted-foreground" : "text-primary-foreground/30 hover:text-primary-foreground/60"
            }`}
          >
            Admin
          </Link>
        </div>

        <button
          className={`md:hidden ${scrolled || !isHome ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3">
          {links.map((l) => (
            l.isHash ? (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            )
          ))}
          <Link
            to="/admin-login"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium uppercase tracking-widest text-muted-foreground/50 hover:text-muted-foreground"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
