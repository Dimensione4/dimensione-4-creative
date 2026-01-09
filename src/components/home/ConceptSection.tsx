import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Layers, Clock } from "lucide-react";

const dimensions = [
  {
    icon: Eye,
    title: "Prospettiva",
    description: "Ogni progetto viene osservato da angolazioni diverse. Analizzo obiettivi, utenti e contesto prima di scrivere una riga di codice.",
    dimension: "1D",
  },
  {
    icon: Layers,
    title: "Struttura",
    description: "Architettura solida, componenti riutilizzabili, codice leggibile. Costruisco fondamenta che reggono la crescita.",
    dimension: "2D",
  },
  {
    icon: Clock,
    title: "Tempo",
    description: "I progetti migliori evolvono. Iterazione continua, miglioramenti misurabili, supporto a lungo termine.",
    dimension: "3D → 4D",
  },
];

export function ConceptSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container-tight relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-label text-primary mb-4 block">
            Il concetto
          </span>
          <h2 className="font-display text-h2 font-bold mb-4">
            Cos'è la "quarta dimensione"?
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Non è magia. È un approccio che aggiunge profondità ai progetti digitali attraverso tre principi fondamentali.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {dimensions.map((dim, index) => (
            <motion.div
              key={dim.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group surface-card p-8 relative"
            >
              {/* Dimension badge */}
              <div className="absolute top-6 right-6 font-mono text-label text-muted-foreground">
                {dim.dimension}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <dim.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-h3 font-semibold mb-3">
                {dim.title}
              </h3>
              <p className="text-body text-muted-foreground leading-relaxed">
                {dim.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
