import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/GoogleAnalytics";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Glow effect with parallax */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-glow-pulse"
          style={{ y: glowY }}
        />
      </div>

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
            Una call chiara di 15 minuti per capire se posso aiutarti. Niente
            pressioni, niente attesa inutile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-center">
            <Button
              variant="hero"
              size="xl"
              className="cta-glow"
              asChild
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "footer_cta_primary",
                  cta_text: "Prenota una call",
                  location: "cta_section",
                })
              }
            >
              <Link to="/contatti">
                Prenota una call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "footer_cta_secondary",
                  cta_text: "Scrivi via email",
                  location: "cta_section",
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
