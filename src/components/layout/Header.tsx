import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-[hsl(var(--border))]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-tight">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={logoSymbol}
                alt="Dimensione 4"
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <div className="overflow-hidden">
              <motion.span
                className="font-display font-semibold text-lg tracking-tight block"
                initial={false}
              >
                Dimensione 4
              </motion.span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-surface/50 backdrop-blur-xl border border-[hsl(var(--border))]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                >
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side - Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4 relative z-10">
            <ThemeToggle />
            <Button variant="hero" size="default" className="group" asChild>
              <Link to="/contatti">
                <span>Prenota una call</span>
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Animated Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-surface/50 backdrop-blur-xl border border-[hsl(var(--border))] z-10"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                className="block h-0.5 bg-foreground origin-center"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 7 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 bg-foreground"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  scaleX: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-foreground origin-center"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -7 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-3xl z-40"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="container-tight pt-8 pb-12 flex flex-col h-full"
            >
              <div className="flex-1 flex flex-col justify-center gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 text-3xl font-display font-semibold transition-colors duration-300 ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="inline-block">{link.label}</span>
                      {location.pathname === link.href && (
                        <motion.span
                          layoutId="mobile-indicator"
                          className="inline-block w-2 h-2 bg-primary rounded-full ml-3 align-middle"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 border-t border-[hsl(var(--border))] space-y-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
                <Button variant="hero" size="lg" className="w-full text-lg" asChild>
                  <Link to="/contatti">
                    Prenota una call
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
