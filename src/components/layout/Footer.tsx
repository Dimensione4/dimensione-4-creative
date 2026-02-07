import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Linkedin,
  Github,
  Instagram,
  Phone,
  Mail,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import logoSymbol from "@/assets/logo-symbol.png";
import { localizedRoutes } from "@/lib/routes/routes";

const navLinks = [
  { href: "/chi-sono", labelKey: "nav.about" },
  { href: "/servizi", labelKey: "nav.services" },
  { href: "/mvp", labelKey: "nav.mvp" },
  { href: "/progetti", labelKey: "nav.projects" },
  { href: "/metodo", labelKey: "nav.method" },
  { href: "/abbonamento", labelKey: "nav.subscription" },
  { href: "/contatti", labelKey: "nav.contacts" },
];

const legalLinks = [
  { href: "/privacy-policy", labelKey: "footer.privacyPolicy" },
  { href: "/cookie-policy", labelKey: "footer.cookiePolicy" },
  { href: "/termini-condizioni", labelKey: "footer.termsConditions" },
];

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialLinks = [
  {
    href: "https://linkedin.com/in/dariobellini",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/Dimensione4",
    label: "GitHub",
    icon: Github,
  },
  { href: "https://x.com/dariomarcobellini", label: "X", icon: XIcon },
  {
    href: "https://instagram.com/dimensione4.it",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://tiktok.com/@dariomarcobellini",
    label: "TikTok",
    icon: TikTokIcon,
  },
];

function MagneticLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const { scrollToTop } = useScrollToTop();

  const handleClick = () => {
    if (!external) {
      // Scroll to top for internal links
      scrollToTop();
    }
  };

  if (external) {
    return (
      <motion.div
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <span className="text-[15px] md:text-sm">{children}</span>
          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ x: 8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        to={href}
        onClick={handleClick}
        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <span className="text-[15px] md:text-sm">{children}</span>
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
      </Link>
    </motion.div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const lang = localizedRoutes[currentLang as keyof typeof localizedRoutes]
    ? (currentLang as keyof typeof localizedRoutes)
    : "it";

  return (
    <footer
      id="site-footer"
      className="relative border-t border-[hsl(var(--border))] bg-background overflow-hidden"
    >
      {/* Main Footer Content */}
      <div className="container-fluid relative">
        {/* Middle section - Links Grid */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <motion.img
                src={logoSymbol}
                alt="Dimensione 4"
                className="w-12 h-12 object-contain"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              />
              <span className="font-display font-semibold text-xl">
                Dimensione 4
              </span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm mb-8">
              {t("footer.description")}
            </p>
            <div className="text-primary font-mono tracking-wide">
              <div className="relative overflow-hidden h-6 md:h-7 w-full">
                <div className="flex animate-tagline-slider">
                  <span className="min-w-full text-base md:text-lg whitespace-nowrap">
                    Precisione tecnica.
                  </span>
                  <span className="min-w-full text-base md:text-lg whitespace-nowrap">
                    Sensibilità visiva.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <MagneticLink href={link.href}>
                    {t(link.labelKey)}
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
              {t("footer.social")}
            </h4>
            <div className="flex flex-wrap gap-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface border border-[hsl(var(--border))] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
              {t("footer.contacts")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={localizedRoutes[lang].contacts}
                  className="inline-flex items-center gap-2 text-[15px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary/80" />
                  {t("footer.bookCall")}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:dariomarcobellini@dimensione4.it"
                  className="inline-flex items-center gap-2 text-[15px] text-muted-foreground text-cyan-400 hover:text-foreground transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-primary/80" />
                  dariomarcobellini@dimensione4.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="py-6 border-t border-[hsl(var(--border))]">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-start md:justify-center gap-4 sm:gap-6 text-left md:text-center">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left md:text-center"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <button
              onClick={() =>
                (
                  window as unknown as { openCookieConsent?: () => void }
                ).openCookieConsent?.()
              }
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left md:text-center"
            >
              {t("footer.manageCookies")}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-xs text-muted-foreground text-left">
            <p>
              © {currentYear}{" "}
              <strong className="font-semibold text-cyan-400">
                Dimensione 4 di Dario Marco Bellini{" "}
              </strong>{" "}
              <span className="block md:inline"> - P.IVA 04678930167</span>
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group self-start md:self-auto"
            whileHover={{ y: -2 }}
          >
            <span>{t("common.backToTop")}</span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↑
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
