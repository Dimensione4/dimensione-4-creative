import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-surface/50">
      <div className="container-tight py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <span className="font-display font-bold text-lg text-primary-foreground">4</span>
              </div>
              <span className="font-display font-semibold text-lg">Dimensione 4</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Studio di ingegneria creativa. Trasformo siti web piatti in esperienze con profondità, struttura e crescita nel tempo.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Navigazione</h4>
            <ul className="space-y-2">
              {[
                { href: "/servizi", label: "Servizi" },
                { href: "/metodo", label: "Metodo" },
                { href: "/abbonamento", label: "Abbonamento" },
                { href: "/chi-sono", label: "Chi sono" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Contatti</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/contatti"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Richiedi disponibilità
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:info@dimensione4.it"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@dimensione4.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dimensione 4 di Dario Marco Bellini. P.IVA 00000000000
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Precisione tecnica. Sensibilità visiva.
          </p>
        </div>
      </div>
    </footer>
  );
}
