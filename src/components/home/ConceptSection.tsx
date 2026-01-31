import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eye, Layers, Clock } from "lucide-react";

const dimensions = [
  {
    icon: Eye,
    title: "Prospettiva",
    description:
      "Ogni progetto inizia da uno sguardo profondo. Analizzo obiettivi, utenti e contesto prima di scrivere una riga di codice.",
    highlight: "Capire prima di costruire.",
  },
  {
    icon: Layers,
    title: "Struttura",
    description:
      "Costruisco su basi solide e riusabili. Progetto architetture chiare, strutture modulari e codice leggibile che resiste al tempo e al cambiamento.",
    highlight: "Stabilità che regge la crescita.",
  },
  {
    icon: Clock,
    title: "Tempo",
    description:
      "I progetti migliori evolvono nel tempo. Iterazione continua, miglioramenti misurabili, supporto a lungo termine.",
    highlight: "Crescita costante nel tempo.",
  },
];

export function ConceptSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background accent with parallax */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-3xl geo-breathing"
        style={{ y: glowY }}
      />

      <div className="container-wide relative">
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
            La <span className="text-gradient">quarta dimensione</span> del
            digitale
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            è l'approccio che aggiunge{" "}
            <strong className="text-gradient">profondità</strong> ai progetti
            digitali: una combinazione di{" "}
            <strong className="text-gradient">visione</strong>,{" "}
            <strong className="text-gradient">struttura</strong> e{" "}
            <strong className="text-gradient">continuità</strong>. Non solo
            estetica, ma architettura solida, metodo e miglioramento costante{" "}
            <strong className="text-gradient">
              per risultati che restano nel tempo
            </strong>
            .
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
              {/* Icon + Title Row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <dim.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-h3 font-semibold">
                  {dim.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-body text-muted-foreground leading-relaxed mb-3">
                {dim.description}
              </p>

              {/* Highlight phrase */}
              <p className="text-gradient font-medium">{dim.highlight}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Solo quando un progetto ha{" "}
            <span className="font-semibold">visione</span>,{" "}
            <span className="font-semibold">fondamenta</span> e{" "}
            <span className="font-semibold">tempo per evolversi</span>, entra
            nella sua vera profondità:{" "}
            <span className="text-primary font-semibold">
              la quarta dimensione
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
