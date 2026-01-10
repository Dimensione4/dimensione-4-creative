import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from "framer-motion";
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

// Magnetic link component
function MagneticLink({ 
  href, 
  isActive, 
  children 
}: { 
  href: string; 
  isActive: boolean; 
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull strength
    const pullStrength = 0.3;
    x.set((e.clientX - centerX) * pullStrength);
    y.set((e.clientY - centerY) * pullStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link
      ref={ref}
      to={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-primary/10 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <motion.span
        style={{ x: springX, y: springY }}
        className={`relative z-10 block ${
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  
  // Page scroll progress for the indicator
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Progress from 0 to 1 over 100px of scroll
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  const hasScrolled = scrollProgress > 0.1;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled
          ? "bg-background/60 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="container-tight">
        <motion.div 
          className="flex items-center justify-between"
          animate={{ 
            height: hasScrolled ? 64 : 80,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              animate={{ scale: hasScrolled ? 0.9 : 1 }}
            >
              <img
                src={logoSymbol}
                alt="Dimensione 4"
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <motion.div 
              className="overflow-hidden"
              animate={{ 
                opacity: hasScrolled ? 0 : 1,
                width: hasScrolled ? 0 : "auto",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-display font-semibold text-lg tracking-tight whitespace-nowrap">
                Dimensione 4
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Center with shrinking pill */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <motion.div 
              className="flex items-center rounded-full bg-surface/50 backdrop-blur-xl border border-[hsl(var(--border))]"
              animate={{
                gap: hasScrolled ? 0 : 4,
                paddingLeft: hasScrolled ? 6 : 8,
                paddingRight: hasScrolled ? 6 : 8,
                paddingTop: hasScrolled ? 4 : 6,
                paddingBottom: hasScrolled ? 4 : 6,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link) => (
                <MagneticLink
                  key={link.href}
                  href={link.href}
                  isActive={location.pathname === link.href}
                >
                  {link.label}
                </MagneticLink>
              ))}
            </motion.div>
          </nav>

          {/* Right side - Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4 relative z-10">
            <ThemeToggle />
            <motion.div
              animate={{ scale: hasScrolled ? 0.95 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="hero" size={hasScrolled ? "sm" : "default"} className="group" asChild>
                <Link to="/contatti">
                  <span>Prenota una call</span>
                  <motion.span
                    className="inline-block ml-2"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
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
        </motion.div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-background/95 backdrop-blur-3xl z-40 overflow-y-auto"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="container-tight pt-24 pb-12 flex flex-col min-h-full"
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
