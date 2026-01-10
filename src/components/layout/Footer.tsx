import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logoSymbol from "@/assets/logo-symbol.png";

const navLinks = [
  { href: "/servizi", label: "Servizi" },
  { href: "/mvp", label: "MVP" },
  { href: "/progetti", label: "Progetti" },
  { href: "/metodo", label: "Metodo" },
  { href: "/abbonamento", label: "Abbonamento" },
  { href: "/chi-sono", label: "Chi sono" },
];

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://github.com", label: "GitHub" },
  { href: "https://twitter.com", label: "X/Twitter" },
];

function MagneticLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const Component = external ? 'a' : Link;
  const props = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { to: href };
  
  return (
    <motion.div
      whileHover={{ x: 8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Component
        {...props as any}
        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <span className="text-sm">{children}</span>
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
      </Component>
    </motion.div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-[hsl(var(--border))] bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="container-tight relative">
        {/* Top section - Big CTA */}
        <div className="py-16 md:py-24 border-b border-[hsl(var(--border))]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-6">
              Pronto a dare{" "}
              <span className="text-gradient">profondità</span>
              <br />
              al tuo progetto?
            </h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contatti"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg group hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-shadow duration-500"
              >
                <span>Iniziamo</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

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
              <span className="font-display font-semibold text-xl">Dimensione 4</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm mb-8">
              Studio creativo di Dario Marco Bellini. Trasformo idee in esperienze digitali con profondità, struttura e visione.
            </p>
            <p className="text-xs text-muted-foreground font-mono tracking-wide">
              Precisione tecnica. Sensibilità visiva.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Navigazione
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <MagneticLink href={link.href}>{link.label}</MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Social
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <MagneticLink href={link.href} external>{link.label}</MagneticLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Contatti
            </h4>
            <ul className="space-y-3">
              <li>
                <MagneticLink href="/contatti">Prenota call</MagneticLink>
              </li>
              <li>
                <a
                  href="mailto:dariomarcobellini@dimensione4.it"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                >
                  dariomarcobellini@dimensione4.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Dimensione 4 di Dario Marco Bellini. P.IVA 00000000000
          </p>
          
          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span>Torna su</span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↑
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
