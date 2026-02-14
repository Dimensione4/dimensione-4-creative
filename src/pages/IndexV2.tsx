import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { MethodSection } from "@/components/home/MethodSection";
import { AvailabilitySection } from "@/components/home/AvailabilitySection";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Play,
  Eye,
  Layers,
  Clock,
  BarChart3,
  Gauge,
  Code2,
  Palette,
  Zap,
  Shield,
  Check,
  MessageCircle,
} from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedRoutes } from "@/lib/routes/routes";

const Hero3DScene = lazy(() =>
  import("@/components/home/Hero3DScene").then((mod) => ({
    default: mod.Hero3DScene,
  })),
);

type Lang = "it" | "en";

function HeroV2({ lang, routes }: { lang: Lang; routes: Record<string, string> }) {
  const isItalian = lang === "it";
  const bookingLink = `${routes.contacts}#calendly`;

  return (
    <section id="hero" data-snap-label="Hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 pattern-dots" />
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl geo-breathing-slow" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl geo-breathing" />

      <div className="container-wide relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-[hsl(var(--border))] text-label text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
              {isItalian ? "Studio Creativo" : "Creative Technology Studio"}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-display text-hero-mobile md:text-hero font-bold mb-6">
            <span className="text-primary">{isItalian ? "Sviluppo siti e MVP" : "I build websites and MVPs"}</span>{" "}
            {isItalian ? "che portano" : "that deliver"}{" "}
            <span className="text-primary">{isItalian ? "risultati misurabili" : "measurable results"}</span>.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-body-lg text-muted-foreground mb-4 max-w-2xl">
            {isItalian
              ? "Ti aiuto a trasformare idee e siti statici in prodotti digitali chiari, veloci e orientati alla conversione."
              : "I help turn ideas and static websites into digital products that are clear, fast, and conversion-oriented."}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-body-lg mb-1 max-w-2xl font-semibold">
            {isItalian ? "Trasforma il tuo sito web piatto in uno" : "Turn your flat website into a"} <span className="text-primary">4D</span>.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }} className="text-body text-muted-foreground mb-8 max-w-2xl">
            {isItalian ? "4D significa: Direzione, Design, Development, Dati." : "4D means: Direction, Design, Development, Data."}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="cta-glow" asChild>
              <Link to={bookingLink}>
                {isItalian ? "Prenota una call strategica" : "Book a strategy call"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to={routes.projects}>
                <Play className="w-4 h-4" />
                {isItalian ? "Vedi i progetti" : "View projects"}
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
    </section>
  );
}

function ConceptV2({ lang }: { lang: Lang }) {
  const isItalian = lang === "it";
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const dimensions = [
    {
      icon: Eye,
      title: isItalian ? "Direzione" : "Direction",
      description: isItalian
        ? "Definisco obiettivi, priorità e percorso operativo prima di avviare il progetto."
        : "I define goals, priorities, and execution path before starting the project.",
      highlight: isItalian
        ? "Una rotta chiara prima di costruire davvero."
        : "A clear route before building for real.",
    },
    {
      icon: Layers,
      title: "Design",
      description: isItalian
        ? "Rendo il messaggio comprensibile e l'esperienza intuitiva in ogni passaggio chiave."
        : "I make the message clear and the experience intuitive at every key step.",
      highlight: isItalian
        ? "Chiarezza concreta che guida ogni azione."
        : "Concrete clarity that guides every action.",
    },
    {
      icon: Clock,
      title: "Development",
      description: isItalian
        ? "Sviluppo un prodotto veloce, stabile e scalabile, pronto a crescere nel tempo."
        : "I build a fast, stable, scalable product ready to grow over time.",
      highlight: isItalian
        ? "Qualità tecnica solida che regge nel tempo."
        : "Solid technical quality built to last.",
    },
    {
      icon: BarChart3,
      title: isItalian ? "Dati" : "Data",
      description: isItalian
        ? "Misuro i risultati reali e ottimizzo con continuità ciò che genera impatto."
        : "I measure real results and continuously optimize what creates impact.",
      highlight: isItalian
        ? "Decisioni operative guidate da numeri concreti."
        : "Operational decisions guided by real numbers.",
    },
  ];

  return (
    <section id="concept" ref={ref} data-snap-label="4D" className="section-padding relative overflow-hidden">
      <div className="container-wide relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-left md:text-center mb-12 md:mb-16">
          <span className="font-mono text-label text-primary mb-4 block">{isItalian ? "Cosa significa 4D" : "What 4D means"}</span>
          <h2 className="font-display text-h2 font-bold mb-4">{isItalian ? "Ogni progetto lavora su quattro dimensioni" : "Every project works on four dimensions"}</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl md:mx-auto">
            {isItalian
              ? "Non è un effetto visivo. È un metodo pratico che unisce direzione, design, sviluppo e dati."
              : "Not a visual gimmick. A practical method that combines direction, design, development, and data."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {dimensions.map((dim, index) => (
            <motion.div key={dim.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * (index + 1) }} className="group surface-card p-6 md:p-8 relative flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <dim.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-h3 font-semibold">{dim.title}</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed min-h-[132px] xl:min-h-[118px]">{dim.description}</p>
              <p className="text-gradient font-medium mt-3">{dim.highlight}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesV2({ lang, routes }: { lang: Lang; routes: Record<string, string> }) {
  const isItalian = lang === "it";
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Gauge,
      title: isItalian ? "Siti orientati alla conversione" : "Conversion-oriented websites",
      description: isItalian
        ? "Siti veloci e chiari che aiutano a trasformare visite in contatti reali."
        : "Fast and clear websites that turn visits into real contacts.",
      tags: isItalian ? ["Conversione", "Performance", "SEO tecnico", "UX"] : ["Conversion", "Performance", "Technical SEO", "UX"],
    },
    {
      icon: Code2,
      title: isItalian ? "MVP per validare idee" : "MVP to validate ideas",
      description: isItalian
        ? "Porto una idea sul mercato in tempi rapidi con una base pronta a evolvere."
        : "I bring ideas to market quickly with a base ready to evolve.",
      tags: isItalian ? ["Validazione", "Time-to-market", "Scalabilità", "Roadmap"] : ["Validation", "Time-to-market", "Scalability", "Roadmap"],
    },
    {
      icon: Palette,
      title: isItalian ? "Rework di siti esistenti" : "Existing website rework",
      description: isItalian
        ? "Riprogetto struttura e frontend quando il sito è bello ma non performa."
        : "I redesign structure and frontend when a site looks good but underperforms.",
      tags: isItalian ? ["Rework", "UX", "Frontend", "Ottimizzazione"] : ["Rework", "UX", "Frontend", "Optimization"],
    },
  ];

  return (
    <section id="services" ref={ref} className="section-padding bg-surface/30" data-snap-label={isItalian ? "Servizi" : "Services"}>
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-label text-primary mb-4 block">{isItalian ? "Cosa faccio" : "What I do"}</span>
            <h2 className="font-display text-h2 font-bold">{isItalian ? "Strumenti digitali per crescere" : "Digital tools for growth"}</h2>
          </div>
          <Button variant="outline" asChild>
            <Link to={routes.services}>
              {isItalian ? "Vedi tutti i servizi" : "View all services"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * (index + 1) }} className="group surface-card p-6 md:p-8 relative">
              <div className="flex gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm md:text-body text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-surface/70 border border-[hsl(var(--border))] text-[11px] md:text-xs font-mono text-muted-foreground">
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

function ProofV2({ lang }: { lang: Lang }) {
  const isItalian = lang === "it";
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const points = [
    {
      icon: Zap,
      title: isItalian ? "Più richieste qualificate" : "More qualified requests",
      description: isItalian
        ? "Percorsi e CTA progettati per ridurre attrito e aumentare conversione."
        : "Flows and CTAs designed to reduce friction and increase conversion.",
    },
    {
      icon: Shield,
      title: isItalian ? "Migliore velocità e usabilità" : "Better speed and usability",
      description: isItalian
        ? "Performance e UX curate in modo concreto, non solo estetico."
        : "Performance and UX handled concretely, not just visually.",
    },
    {
      icon: BarChart3,
      title: isItalian ? "Meno dispersione" : "Less dispersion",
      description: isItalian
        ? "Struttura e messaggio allineati agli obiettivi di business."
        : "Structure and message aligned with business goals.",
    },
  ];

  const included = isItalian
    ? ["Messaggio più chiaro", "Architettura contenuti", "Performance core curate", "SEO tecnico di base", "Design consistente", "Supporto al rilascio"]
    : ["Clearer messaging", "Content architecture", "Core performance care", "Basic technical SEO", "Consistent design", "Launch support"];

  return (
    <section id="proof" ref={ref} className="section-padding bg-surface/30" data-snap-label="Proof">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="font-mono text-label text-primary mb-4 block">{isItalian ? "Risultati" : "Results"}</span>
            <h2 className="font-display text-h2 font-bold mb-8">{isItalian ? "Risultati concreti, non promesse generiche." : "Concrete outcomes, not generic promises."}</h2>
            <div className="space-y-6">
              {points.map((proof, index) => (
                <motion.div key={proof.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 * (index + 1) }} className="flex gap-4">
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

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="surface-card p-8">
            <h3 className="font-display text-xl font-semibold mb-6">{isItalian ? "Cosa è sempre incluso" : "What is always included"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }} className="flex items-center gap-3">
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

function ReviewsV2({ lang }: { lang: Lang }) {
  const isItalian = lang === "it";
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reviews = [
    {
      text: isItalian
        ? "Collaborare con Dario significa avere visione, ordine e cura tecnica in ogni dettaglio."
        : "Working with Dario means vision, structure, and technical care in every detail.",
      source: isItalian ? "Ex collega - Accenture" : "Former colleague - Accenture",
    },
    {
      text: isItalian
        ? "Comunicazione chiara, consegna puntuale e soluzioni concrete. Esperienza molto positiva."
        : "Clear communication, on-time delivery, and concrete solutions. Great experience.",
      source: isItalian ? "Feedback cliente - AddLance" : "Client feedback - AddLance",
    },
    {
      text: isItalian
        ? "Sa tradurre obiettivi business in scelte di design e sviluppo davvero efficaci."
        : "He translates business goals into truly effective design and development choices.",
      source: isItalian ? "Ex collega - Accenture" : "Former colleague - Accenture",
    },
  ];

  return (
    <section id="reviews" ref={ref} className="section-padding relative" data-snap-label={isItalian ? "Recensioni" : "Reviews"}>
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10 text-left md:text-center">
          <span className="font-mono text-label text-primary mb-4 block">{isItalian ? "Recensioni" : "Reviews"}</span>
          <h2 className="font-display text-h2 font-bold mb-4">{isItalian ? "Feedback professionali" : "Professional feedback"}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.figure key={`${review.source}-${index}`} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * (index + 1) }} className="surface-card p-6 md:p-8">
              <blockquote className="text-body text-muted-foreground leading-relaxed mb-4">"{review.text}"</blockquote>
              <figcaption className="font-mono text-xs tracking-wide text-primary">{review.source}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaV2({ lang, routes }: { lang: Lang; routes: Record<string, string> }) {
  const isItalian = lang === "it";
  const bookingLink = `${routes.contacts}#calendly`;
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="section-padding relative overflow-hidden" data-snap-label="CTA">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="container-wide relative">
        <div className="surface-card p-8 md:p-16 text-left md:text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-h2 font-bold mb-4 leading-tight">
            {isItalian ? "Se il tuo sito non sta lavorando per te, sistemiamolo." : "If your website is not working for you, let's fix it."}
          </h2>
          <p className="text-body text-muted-foreground mb-8 max-w-xl md:mx-auto">
            {isItalian
              ? "Dimmi dove sei ora e dove vuoi arrivare. Ti propongo un percorso concreto."
              : "Tell me where you are now and where you want to go. I will propose a concrete path."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-center">
            <Button variant="hero" size="xl" className="cta-glow" asChild>
              <Link to={bookingLink}>
                <MessageCircle className="w-4 h-4" />
                {isItalian ? "Prenota una call" : "Book a call"}
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to={routes.services}>{isItalian ? "Scopri i servizi" : "Explore services"}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const IndexV2 = () => {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language.startsWith("en") ? "en" : "it";
  const routes = localizedRoutes[lang];

  return (
    <Layout>
      <SEO
        canonical={routes.home}
        description={
          lang === "it"
            ? "Sviluppo siti e MVP orientati a conversione, performance e crescita."
            : "I build websites and MVPs focused on conversion, performance, and growth."
        }
      />
      <HeroV2 lang={lang} routes={routes} />
      <ConceptV2 lang={lang} />
      <ServicesV2 lang={lang} routes={routes} />
      <MethodSection />
      <ProofV2 lang={lang} />
      <ReviewsV2 lang={lang} />
      <AvailabilitySection />
      <CtaV2 lang={lang} routes={routes} />
    </Layout>
  );
};

export default IndexV2;

