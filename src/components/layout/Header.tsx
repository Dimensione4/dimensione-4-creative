import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoSymbol from "@/assets/logo-symbol.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/mvp", label: "MVP" },
  { href: "/progetti", label: "Progetti" },
  { href: "/metodo", label: "Metodo" },
  { href: "/abbonamento", label: "Abbonamento" },
  { href: "/chi-sono", label: "Chi sono" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-[hsl(var(--border))]">
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <img 
              src={logoSymbol} 
              alt="Dimensione 4" 
              className="w-9 h-9 object-contain"
            />
            <span className="font-display font-semibold text-lg tracking-tight">
              Dimensione 4
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === link.href
                    ? "text-foreground bg-surface"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle + CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="hero" size="default" asChild>
              <Link to="/contatti">Prenota una call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-[hsl(var(--border))]"
          >
            <nav className="container-tight py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === link.href
                      ? "text-foreground bg-surface"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-[hsl(var(--border))] flex flex-col gap-3">
                <div className="flex items-center justify-between px-4">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contatti" onClick={() => setIsMenuOpen(false)}>
                    Prenota una call
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
