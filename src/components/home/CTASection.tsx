import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
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
        className="container-tight relative"
      >
        <div className="surface-card p-12 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-h2 font-bold mb-4">
            Contattami per un confronto diretto, senza impegno.
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Una call chiara di 15 minuti per capire se posso aiutarti. Niente pressioni, niente attesa inutile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="cta-glow" asChild>
              <Link to="/contatti">
                Prenota una call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="mailto:info@dimensione4.it">
                Scrivi via email
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
