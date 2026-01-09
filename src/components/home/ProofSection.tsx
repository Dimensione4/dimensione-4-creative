import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, BarChart3, Check } from "lucide-react";

const proofs = [
  {
    icon: Zap,
    title: "Performance-first",
    description: "Ogni decisione tecnica tiene conto dell'impatto sulle prestazioni.",
  },
  {
    icon: Shield,
    title: "Codice pulito",
    description: "Leggibile, testato, documentato. Facile da mantenere e scalare.",
  },
  {
    icon: BarChart3,
    title: "Miglioramenti misurabili",
    description: "Metriche concrete prima e dopo. Niente promesse vaghe.",
  },
];

const qualities = [
  "Core Web Vitals ottimizzati",
  "SEO tecnico curato",
  "Accessibilità WCAG AA+",
  "Documentazione inclusa",
  "Test automatizzati",
  "Deploy guidato",
];

export function ProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-surface/30">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Proof points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-label text-primary mb-4 block">
              Qualità
            </span>
            <h2 className="font-display text-h2 font-bold mb-8">
              Il codice parla, non le promesse.
            </h2>

            <div className="space-y-6">
              {proofs.map((proof, index) => (
                <motion.div
                  key={proof.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <proof.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">
                      {proof.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {proof.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Quality checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="surface-card p-8"
          >
            <h3 className="font-display text-xl font-semibold mb-6">
              Cosa è sempre incluso
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{quality}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
