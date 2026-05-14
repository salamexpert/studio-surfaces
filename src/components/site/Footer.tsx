import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="container-editorial py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-serif text-sm">
              M
            </span>
            <span className="font-serif text-xl">Marino Ceramic Tile</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            An independent editorial publication exploring the surfaces, materials and
            architecture shaping the way we live. Published from a small studio that
            still believes a great room begins with a great floor.
          </p>
          <form
            className="mt-6 flex w-full max-w-sm items-center gap-2 border-b border-border pb-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm py-2 outline-none placeholder:text-muted-foreground"
            />
            <button className="text-xs uppercase tracking-widest text-accent hover:opacity-70">
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Sections</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/surfaces" className="hover:text-accent">Surfaces</Link></li>
            <li><Link to="/architecture" className="hover:text-accent">Architecture</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-accent">Terms of Service</Link></li>
            <li><Link to="/editorial-policy" className="hover:text-accent">Editorial Policy</Link></li>
            <li><Link to="/dmca-disclaimer" className="hover:text-accent">DMCA Disclaimer</Link></li>
            <li><Link to="/advertise" className="hover:text-accent">Advertise</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Marino Ceramic Tile. An editorial publication.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-accent"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-accent"><Twitter className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-accent"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-accent"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
