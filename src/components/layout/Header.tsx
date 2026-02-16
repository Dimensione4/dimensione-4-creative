import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
} from "framer-motion";
import { PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import logoSymbol from "@/assets/logo-symbol.png";
import { localizedRoutes } from "@/lib/routes/routes";
import { trackEvent } from "@/utils/analytics";

// Magnetic link component
function MagneticLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { scrollToTop } = useScrollToTop();

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

  const handleClick = (e: React.MouseEvent) => {
    // Scroll to top when clicking navigation links
    scrollToTop();
  };

  return (
    <Link
      ref={ref}
      to={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative px-2.5 min-[1400px]:px-3 min-[1650px]:px-4 py-2 text-[0.92rem] min-[1650px]:text-sm font-medium transition-colors duration-300 whitespace-nowrap"
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
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { scrollToTop } = useScrollToTop();
  const { isVisible } = usePageVisibility();
  const currentLang = i18n.language.startsWith("en") ? "en" : "it";
  const routes = localizedRoutes[currentLang];
  const bookingLink = `${routes.contacts}#calendly`;
  const navLinks = [
    { href: routes.home, labelKey: "nav.home" },
    { href: routes.about, labelKey: "nav.about", key: "about" as const },
    { href: routes.services, labelKey: "nav.services", key: "services" as const },
    { href: routes.mvp, labelKey: "nav.mvp", key: "mvp" as const },
    { href: routes.projects, labelKey: "nav.projects", key: "projects" as const },
    { href: routes.method, labelKey: "nav.method", key: "method" as const },
    { href: routes.subscription, labelKey: "nav.subscription", key: "subscription" as const },
    { href: routes.contacts, labelKey: "nav.contacts", key: "contacts" as const },
  ].filter((link) => !("key" in link) || isVisible(link.key));

  // Page scroll progress for the indicator
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCalendly = () => {
    const target = document.getElementById("calendly");
    if (!target) return;

    const headerOffset = window.innerWidth >= 768 ? 96 : 84;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleBookingLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("book_call_click", {
      tool: "calendly",
      location: "header",
    });

    setIsMenuOpen(false);

    if (location.pathname === routes.contacts) {
      event.preventDefault();
      if (window.location.hash !== "#calendly") {
        window.history.replaceState(null, "", `${routes.contacts}#calendly`);
      }
      window.setTimeout(scrollToCalendly, 40);
    }
  };

  // Close menu on route/hash change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Keep subtitle visible when user is back near the top area.
  // A slightly higher threshold avoids "sticky hidden" behavior with snap scrolling.
  const hasScrolled = scrollY > 90;
  const headerHeight = hasScrolled ? 64 : 80;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled ? "bg-background/60 backdrop-blur-2xl" : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container-fluid">
        {/* <motion.div 
          className="flex items-center justify-between"
          animate={{ 
            height: hasScrolled ? 64 : 80,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        > */}
        <motion.div
          className="flex items-center w-full"
          animate={{ height: headerHeight }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to={routes.home}
              className="flex items-center gap-3 group relative z-10"
            >
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
              <div className="overflow-hidden flex flex-col items-start">
                <span className="font-display font-semibold text-lg tracking-tight whitespace-nowrap">
                  Dimensione 4
                </span>
                {!hasScrolled && (
                  <span className="hidden min-[1650px]:inline text-xs bg-gradient-to-r from-[hsl(179,80%,36%)] to-[hsl(180,78%,52%)] bg-clip-text text-transparent whitespace-nowrap mt-0">
                    di Dario Marco Bellini
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Center - Desktop Navigation (hidden on mobile/tablet) */}
          <div className="hidden xl:flex flex-1 justify-center min-w-0 px-3 min-[1650px]:px-5">
            <nav className="flex justify-center min-w-0">
              <motion.div
                style={{ maxWidth: "100%", width: "fit-content" }}
                className="flex items-center rounded-full bg-surface/50 backdrop-blur-xl border border-[hsl(var(--border))]"
                animate={{
                  gap: hasScrolled ? 0 : 2,
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
                    {t(link.labelKey)}
                  </MagneticLink>
                ))}
              </motion.div>
            </nav>
          </div>

          {/* Right side - Controls and Hamburger Menu */}
          <div className="ml-auto flex items-center gap-2 min-[1400px]:gap-3">
            {/* Desktop controls - hidden on mobile/tablet */}
            <div className="hidden xl:flex items-center gap-2 min-[1400px]:gap-3 relative z-10">
              <LanguageSwitch />
              <div className="hidden min-[1240px]:block">
                <ThemeToggle />
              </div>
              <motion.div
                animate={{ scale: hasScrolled ? 0.95 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="hero"
                  size={hasScrolled ? "sm" : "default"}
                  className="group max-[1450px]:px-4"
                  asChild
                >
                  <Link to={bookingLink} onClick={handleBookingLinkClick}>
                    <span className="hidden min-[1400px]:inline">Prenota una call</span>
                    <span className="inline min-[1400px]:hidden">Prenota</span>
                    <PhoneCall className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="xl:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-surface/50 backdrop-blur-xl border border-[hsl(var(--border))] z-[60]"
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
        </motion.div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="xl:hidden fixed left-0 right-0 bottom-0 bg-background/95 backdrop-blur-3xl z-40 overflow-y-auto"
            style={{ top: headerHeight }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="container-fluid py-4 pb-6 flex flex-col min-h-full"
            >
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`block py-2 text-[clamp(1.45rem,6vw,1.9rem)] font-display font-semibold transition-colors duration-300 ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="inline-block">{t(link.labelKey)}</span>
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
                className="mt-4 pt-5 border-t border-[hsl(var(--border))] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lingua</span>
                  <LanguageSwitch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full text-lg"
                  asChild
                >
                  <Link to={bookingLink} onClick={handleBookingLinkClick}>
                    Prenota una call
                    <PhoneCall className="w-4 h-4 ml-2" />
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
