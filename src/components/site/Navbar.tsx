import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#team", label: "Team" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-eco to-cyan-accent shadow-glow">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Polumexa<span className="text-gradient"> Solutions</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-eco after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#dashboard"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium btn-glow"
        >
          Live Demo
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg glass"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-strong border-t border-border"
          >
            <ul className="px-5 py-4 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-foreground/90"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#dashboard"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center items-center px-4 py-2 rounded-full text-sm font-medium btn-glow"
                >
                  Live Demo
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
