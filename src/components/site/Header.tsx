import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const NAV = [
  { to: "/surfaces", label: "Surfaces" },
  { to: "/architecture", label: "Architecture" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#1C1712]/[0.97] backdrop-blur-md border-white/10"
          : "bg-[#1C1712]/80 backdrop-blur-sm border-white/5"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        {/* Logo always rendered in light/white mode against dark header */}
        <NavLink to="/" aria-label="Marino Ceramic Tile — Home">
          <Logo height={32} textColor="#F5EFE7" accentColor="#C07650" />
        </NavLink>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-[13px] tracking-wide uppercase transition-colors ${
                  isActive ? "text-[#C07650]" : "text-white/80 hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="Open navigation menu"
          className="md:hidden p-2 -mr-2 text-white/80 hover:text-white"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile slide-out */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#1C1712] shadow-2xl transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <Logo height={28} textColor="#F5EFE7" accentColor="#C07650" />
            <button aria-label="Close navigation menu" onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-2">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl py-3 border-b border-white/10 text-white/80 hover:text-white hover:text-[#C07650] transition-colors"
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
