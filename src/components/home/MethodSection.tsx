import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Map, Hammer, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Map,
    step: "01",
    title: "Mappa",
    description: "Breve discovery per definire obiettivi chiari. Capisco il contesto, analizzo i problemi, propongo soluzioni concrete.",
    outputs: ["Scope definito", "Priorità chiare", "Timeline realistica"],
  },
  {
    icon: Hammer,
    step: "02",
    title: "Costruisci",
    description: "Sviluppo iterativo con visibilità continua. Codice testato, documentato e pronto per il deploy.",
    outputs: ["Codice PR-ready", "Test inclusi", "Guida deploy"],
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Evolvi",
    description: "Il lancio è l'inizio, non la fine. Iterazione basata sui dati, supporto continuo, crescita misurabile.",
    outputs: ["Metriche tracking", "Miglioramenti continui", "Supporto attivo"],
  },
];

export function MethodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-50" />
      
      <div className="container-tight relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-label text-primary mb-4 block">
            Il metodo
          </span>
          <h2 className="font-display text-h2 font-bold mb-4">
            Mappa → Costruisci → Evolvi
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Un processo semplice, async-first, con accesso diretto e un unico responsabile.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full">
                  <div className="flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                    <ArrowRight className="w-4 h-4 text-primary/50 -ml-1" />
                  </div>
                </div>
              )}

              {/* Card */}
              <div className="surface-card p-8 h-full">
                {/* Step number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="font-mono text-h3 text-primary/30 font-bold">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-h3 font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-muted-foreground mb-6">
                  {step.description}
                </p>

                {/* Outputs */}
                <ul className="space-y-2">
                  {step.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
