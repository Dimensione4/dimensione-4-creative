import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useSectionSnapScroll } from "@/hooks/useSectionSnapScroll";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Eye,
  Layers,
  Clock,
  Gauge,
  Code2,
  Palette,
  Map,
  Hammer,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  Check,
  MessageCircle,
} from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";

const Hero3DScene = lazy(() =>
  import("@/components/home/Hero3DScene").then((mod) => ({
    default: mod.Hero3DScene,
  }))
);

const dimensions = [
  {
    icon: Eye,
    title: "Direzione",
    description:
      "Definisco obiettivi, priorita e percorso prima di iniziare lo sviluppo.",
    highlight: "Una rotta chiara prima di costruire.",
  },
  {
    icon: Layers,
    title: "Design",
    description:
      "Rendo il messaggio comprensibile e l'esperienza intuitiva in ogni passaggio.",
    highlight: "Chiarezza che guida l'azione.",
  },
  {
    icon: Clock,
    title: "Development + Dati",
    description:
      "Costruisco in modo solido, misuro i risultati e ottimizzo cio che conta.",
    highlight: "Qualita tecnica e miglioramento continuo.",
  },
];

const services = [
  {
    icon: Gauge,
    title: "Siti orientati alla conversione",
    description:
      "Siti veloci e chiari che aiutano a trasformare visite in contatti reali.",
    tags: ["Conversione", "Performance", "SEO tecnico", "UX"],
  },
  {
    icon: Code2,
    title: "MVP per validare idee",
    description:
      "Porto una idea sul mercato in tempi rapidi con una base pronta a evolvere.",
    tags: ["Validazione", "Time-to-market", "Scalabilita", "Roadmap"],
  },
  {
    icon: Palette,
    title: "Rework di siti esistenti",
    description:
      "Riprogetto struttura e frontend quando il sito e bello ma non performa.",
    tags: ["Rework", "UX", "Frontend", "Ottimizzazione"],
  },
];

const steps = [
  {
    icon: Map,
    step: "01",
    title: "Analisi",
    description:
      "Capisco obiettivi, vincoli e opportunita prima di definire le priorita.",
    outputs: ["Obiettivi chiari", "Priorita condivise", "Direzione operativa"],
  },
  {
    icon: Hammer,
    step: "02",
    title: "Strategia e Build",
    description:
      "Definisco la struttura e sviluppo con attenzione a qualita, velocita e coerenza.",
    outputs: ["Architettura chiara", "UI consistente", "Codice stabile"],
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Ottimizzazione",
    description:
      "Misuro il comportamento reale e miglioro con interventi guidati dai dati.",
    outputs: ["Metriche utili", "Iterazioni mirate", "Risultati misurabili"],
  },
];

const proofPoints = [
  {
    icon: Zap,
    title: "Piu richieste qualificate",
    description:
      "Percorsi e CTA progettati per ridurre attrito e aumentare conversione.",
  },
  {
    icon: Shield,
    title: "Migliore velocita e usabilita",
    description:
      "Performance e UX curate in modo concreto, non solo estetico.",
  },
  {
    icon: BarChart3,
    title: "Meno dispersione",
    description:
      "Struttura e messaggio allineati agli obiettivi di business.",
  },
];

const included = [
  "Messaggio piu chiaro",
  "Architettura contenuti",
  "Performance core curate",
  "SEO tecnico di base",
  "Design consistente",
  "Supporto al rilascio",
];

const reviews = [
  {
    text: "Collaborare con Dario significa avere visione, ordine e cura tecnica in ogni dettaglio.",
    source: "Ex collega - Accenture",
  },
  {
    text: "Comunicazione chiara, consegna puntuale e soluzioni concrete. Esperienza molto positiva.",
    source: "Feedback cliente - AddLance",
  },
  {
    text: "Sa tradurre obiettivi business in scelte di design e sviluppo davvero efficaci.",
    source: "Ex collega - Accenture",
  },
];

function HeroV2() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glow1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      id="hero"
      ref={ref}
      data-snap-label="Hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 pattern-dots" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl geo-breathing-slow"
        style={{ y: glow1Y }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl geo-breathing"
        style={{ y: glow2Y }}
      />

      <div className="container-wide relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-[hsl(var(--border))] text-label text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
              Dimensione 4 di Dario Marco Bellini
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-hero-mobile md:text-hero font-bold mb-6"
          >
            Sviluppo siti e MVP che portano risultati misurabili.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-muted-foreground mb-4 max-w-2xl"
          >
            Ti aiuto a trasformare idee e siti statici in prodotti digitali chiari, veloci e orientati alla conversione.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-body-lg mb-1 max-w-2xl font-semibold"
          >
            Trasforma il tuo sito web piatto in uno 4D.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="text-body text-muted-foreground mb-8 max-w-2xl"
          >
            4D significa: Direzione, Design, Development, Dati.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" className="cta-glow" asChild>
              <Link to="/contatti">
                Prenota una call strategica
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/progetti">
                <Play className="w-4 h-4" />
                Vedi i progetti
              </Link>
            </Button>
          </motion.div>

          <div className="mt-10 md:mt-0">
            <Suspense fallback={null}>
              <Hero3DScene
                className="relative z-10 flex items-center justify-center md:absolute md:inset-0 md:z-20 md:justify-end md:pr-[6%] pointer-events-none"
                canvasClassName="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[620px] pointer-events-auto"
              />
            </Suspense>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function ConceptV2() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="concept" ref={ref} data-snap-label="4D" className="section-padding relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-3xl geo-breathing"
        style={{ y: glowY }}
      />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-left md:text-center mb-12 md:mb-16"
        >
          <span className="font-mono text-label text-primary mb-4 block">Cosa significa 4D</span>
          <h2 className="font-display text-h2 font-bold mb-4">Ogni progetto lavora su quattro dimensioni</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl md:mx-auto">
            Non e un effetto visivo. E un metodo pratico che unisce direzione, design, sviluppo e dati.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {dimensions.map((dim, index) => (
            <motion.div
              key={dim.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group surface-card p-6 md:p-8 relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <dim.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-h3 font-semibold">{dim.title}</h3>
              </div>

              <p className="text-body text-muted-foreground leading-relaxed mb-3">{dim.description}</p>
              <p className="text-gradient font-medium">{dim.highlight}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesV2() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="section-padding bg-surface/30" data-snap-label="Servizi">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-mono text-label text-primary mb-4 block">Cosa faccio</span>
            <h2 className="font-display text-h2 font-bold">Strumenti digitali per crescere</h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/servizi">
              Vedi tutti i servizi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group surface-card p-6 md:p-8 relative"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm md:text-body text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-surface/70 border border-[hsl(var(--border))] text-[11px] md:text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodV2() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section id="method" ref={ref} className="section-padding relative overflow-hidden" data-snap-label="Metodo">
      <motion.div className="absolute inset-0 pattern-grid opacity-50" style={{ y: patternY }} />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-label text-primary mb-4 block">Metodo</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-h2 font-bold mb-4 leading-tight md:leading-none">
            Analisi - Strategia - Ottimizzazione
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Un processo semplice, con un unico referente e decisioni chiare in ogni fase.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
              className="relative"
            >
              <div className="surface-card p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="font-mono text-h3 text-primary/30 font-bold">{step.step}</span>
                </div>

                <h3 className="font-display text-h3 font-semibold mb-3">{step.title}</h3>
                <p className="text-body text-muted-foreground mb-6">{step.description}</p>

                <ul className="space-y-2">
                  {step.outputs.map((output) => (
                    <li key={output} className="flex items-center gap-2 text-sm text-muted-foreground">
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

function ProofV2() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="proof" ref={ref} className="section-padding bg-surface/30" data-snap-label="Proof">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-label text-primary mb-4 block">Risultati</span>
            <h2 className="font-display text-h2 font-bold mb-8">Risultati concreti, non promesse generiche.</h2>

            <div className="space-y-6">
              {proofPoints.map((proof, index) => (
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
                    <h3 className="font-display font-semibold mb-1">{proof.title}</h3>
                    <p className="text-sm text-muted-foreground">{proof.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="surface-card p-8"
          >
            <h3 className="font-display text-xl font-semibold mb-6">Cosa e sempre incluso</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewsV2() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" ref={ref} className="section-padding relative" data-snap-label="Recensioni">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-left md:text-center"
        >
          <span className="font-mono text-label text-primary mb-4 block">Recensioni</span>
          <h2 className="font-display text-h2 font-bold mb-4">Feedback professionali</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl md:mx-auto">
            Opinioni da colleghi e clienti su metodo, qualita e affidabilita.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.figure
              key={`${review.source}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="surface-card p-6 md:p-8"
            >
              <blockquote className="text-body text-muted-foreground leading-relaxed mb-4">
                "{review.text}"
              </blockquote>
              <figcaption className="font-mono text-xs tracking-wide text-primary">{review.source}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaV2() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="section-padding relative overflow-hidden" data-snap-label="CTA">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container-wide relative"
      >
        <div className="surface-card p-8 md:p-16 text-left md:text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-h2 font-bold mb-4 leading-tight">
            Se il tuo sito non sta lavorando per te, sistemiamolo.
          </h2>
          <p className="text-body text-muted-foreground mb-8 max-w-xl md:mx-auto">
            Dimmi dove sei ora e dove vuoi arrivare. Ti propongo un percorso concreto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-center">
            <Button variant="hero" size="xl" className="cta-glow" asChild>
              <Link to="/contatti">
                <MessageCircle className="w-4 h-4" />
                Prenota una call
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/servizi">Scopri i servizi</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const IndexV2 = () => {
  useSectionSnapScroll([
    "hero",
    "concept",
    "services",
    "method",
    "proof",
    "reviews",
    "cta",
    "site-footer",
  ]);

  return (
    <Layout>
      <SEO
        canonical="/"
        description="Sviluppo siti e MVP orientati a conversione, performance e crescita."
      />
      <HeroV2 />
      <ConceptV2 />
      <ServicesV2 />
      <MethodV2 />
      <ProofV2 />
      <ReviewsV2 />
      <CtaV2 />
    </Layout>
  );
};

export default IndexV2;
