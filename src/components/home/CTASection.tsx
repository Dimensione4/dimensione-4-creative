import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="section-padding relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container-wide relative"
      >
        <div className="surface-card p-8 md:p-16 text-left md:text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-h2 font-bold mb-4 leading-tight">
            Contattami per un confronto diretto, senza impegno.
          </h2>
          <p className="text-body text-muted-foreground mb-8 max-w-xl md:mx-auto">
            Una call chiara di 30 minuti per capire se posso aiutarti. Niente
            pressioni, niente attesa inutile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-center">
            <Button
              variant="hero"
              size="xl"
              className="cta-glow"
              asChild
              onClick={() =>
                trackEvent("book_call_click", {
                  tool: "calendly",
                  location: "cta_section",
                })
              }
            >
              <Link to="/contatti#calendly">
                Prenota una call
                <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              onClick={() =>
                trackEvent("cta_click", {
                  cta_text: "Scrivi via email",
                  cta_section: "cta_section",
                })
              }
            >
              <a href="mailto:dariomarcobellini@dimensione4.it">
                Scrivi via email
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

