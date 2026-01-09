import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Lightbulb, Target, Code2, Rocket, RefreshCw, Check, HelpCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const processSteps = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description: "Analizziamo insieme la tua idea, il mercato target e definiamo obiettivi chiari e misurabili.",
    duration: "1 settimana",
  },
  {
    icon: Target,
    title: "Scope & Planning",
    description: "Definiamo le feature core del MVP, eliminiamo il superfluo e creiamo una roadmap realistica.",
    duration: "1 settimana",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Sviluppo iterativo con aggiornamenti regolari. Vedi il tuo prodotto prendere forma.",
    duration: "2-8 settimane",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploy su infrastruttura cloud scalabile. Il tuo MVP è live e pronto per i primi utenti.",
    duration: "1 settimana",
  },
  {
    icon: RefreshCw,
    title: "Iterate",
    description: "Raccogli feedback, analizza i dati e pianifichiamo insieme le prossime iterazioni.",
    duration: "Ongoing",
  },
];

const deliverables = [
  "Web app funzionante e deployata",
  "Codebase pulita e documentata",
  "Repository Git con CI/CD",
  "Infrastruttura cloud configurata",
  "Handover tecnico completo",
  "30 giorni di supporto post-lancio",
];

const idealClient = [
  "Hai un'idea validata con potenziali utenti",
  "Vuoi andare sul mercato in settimane, non mesi",
  "Preferisci qualità a quantità di feature",
  "Cerchi un partner tecnico, non solo un esecutore",
];

const faqs = [
  {
    question: "Quanto costa un MVP?",
    answer: "Il costo varia in base alla complessità. Un MVP tipico parte da €8.000-15.000. Durante la discovery call definiamo scope e budget insieme, senza sorprese.",
  },
  {
    question: "Quali tecnologie usate?",
    answer: "Stack moderno e battle-tested: Next.js o React per il frontend, Supabase o PostgreSQL per il backend, Tailwind CSS per lo styling, deploy su Vercel o AWS. Tutto TypeScript.",
  },
  {
    question: "E se il mio MVP deve scalare?",
    answer: "Il codice che scrivo è pensato per crescere. Architettura modulare, best practices, e tecnologie che scalano da 0 a milioni di utenti senza riscrivere tutto.",
  },
  {
    question: "Offrite anche app mobile?",
    answer: "Per il web, sempre. Per mobile, possiamo partire con una PWA (Progressive Web App) o sviluppare in Flutter per un'esperienza native. Discutiamone in base alle tue esigenze.",
  },
];

export default function MVP() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="font-mono text-label text-primary mb-4 block">
              MVP Custom
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              Dal concept al lancio in settimane, non mesi
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Trasformo la tua idea in un prodotto digitale funzionante. Niente feature creep, niente over-engineering. Solo ciò che serve per validare e lanciare.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Prenota una discovery call
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Ideal Client */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              Per chi è questo servizio
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-xl">
              L'MVP Custom è ideale per founder e team che vogliono muoversi velocemente con un approccio strutturato.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {idealClient.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start gap-3 p-4 surface-card"
                >
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-body">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-surface/50">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              Il processo
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Un percorso strutturato in 5 fasi per portarti dall'idea al prodotto live.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
            
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0 relative z-10">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="surface-card p-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-xl font-bold">{step.title}</h3>
                      <span className="font-mono text-xs text-primary">{step.duration}</span>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-h2 font-bold mb-4">
                Cosa ricevi
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Non solo codice, ma un prodotto completo pronto per crescere con te.
              </p>
              
              <div className="space-y-3">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="surface-card p-8"
            >
              <h3 className="font-display text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel", "AWS", "Flutter"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-surface text-sm font-mono text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[hsl(var(--border))]">
                <p className="font-mono text-sm text-muted-foreground mb-2">Timeline tipica</p>
                <p className="font-display text-2xl font-bold text-primary">4-12 settimane</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface/50">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-h2 font-bold mb-4">
              Domande frequenti
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="surface-card px-6 border-none"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left font-display font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="surface-card p-10 md:p-14 text-center"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              Pronto a trasformare la tua idea in realtà?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Prenota una discovery call gratuita di 30 minuti. Analizziamo insieme la tua idea e vediamo se possiamo lavorare insieme.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Prenota una discovery call
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
