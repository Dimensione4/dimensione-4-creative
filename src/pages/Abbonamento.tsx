import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, RefreshCcw, Code2, FileText, TestTube } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const rules = [
  {
    icon: RefreshCcw,
    title: "1 task attivo per volta",
    description: "Lavoro su una richiesta alla volta, con focus totale. La coda è illimitata: aggiungi quante richieste vuoi.",
  },
  {
    icon: Code2,
    title: "Comunicazione async",
    description: "Niente call obbligatorie, niente Slack urgente. Aggiornamenti scritti, documentati, entro 24h.",
  },
  {
    icon: FileText,
    title: "Consegna completa",
    description: "Ogni task viene consegnato PR-ready con test e guida deploy. Niente work-in-progress indefinito.",
  },
  {
    icon: TestTube,
    title: "Revisioni illimitate",
    description: "Finché la richiesta originale non è perfetta. Entro 14-30 giorni dalla consegna.",
  },
];

const included = [
  "Richieste illimitate (1 attiva per volta)",
  "Revisioni illimitate per richiesta",
  "Comunicazione async prioritaria",
  "Consegna PR-ready con test",
  "Documentazione inclusa",
  "Bug fixing garantito",
  "WordPress micro-task",
  "Piccoli refactoring React",
];

const excluded = [
  "Progetti epici indefiniti",
  "Redesign completi da zero",
  "Backend complessi (database design, API complesse)",
  "Call giornaliere obbligatorie",
  "Lavoro senza scope definito",
];

const examples = [
  { title: "Fix performance mobile", type: "Performance" },
  { title: "Landing Page Next.js", type: "Frontend" },
  { title: "Refactor componenti React", type: "Code Quality" },
  { title: "Audit SEO tecnico", type: "SEO" },
  { title: "Implementazione design system", type: "Design" },
  { title: "Ottimizzazione Core Web Vitals", type: "Performance" },
  { title: "Fix accessibilità WCAG", type: "A11y" },
  { title: "Animazioni Framer Motion", type: "Motion" },
];

export default function Abbonamento() {
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
            className="max-w-3xl"
          >
            <span className="font-mono text-label text-primary mb-4 block">
              Developer in abbonamento
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              Non è un retainer. È un sistema di miglioramento continuo.
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Accesso diretto a un developer senior per task frontend, WordPress e ottimizzazione. Senza impegno a lungo termine, senza ore da contare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rules */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-h2 font-bold mb-4">Come funziona</h2>
            <p className="text-body-lg text-muted-foreground max-w-xl">
              Regole semplici, risultati prevedibili.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <rule.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {rule.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {rule.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included / Excluded */}
      <section className="section-padding bg-surface/30">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Included */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="surface-card p-8"
            >
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                Incluso
              </h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Excluded */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="surface-card p-8"
            >
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                Non incluso
              </h3>
              <ul className="space-y-3">
                {excluded.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Per progetti complessi, considera il servizio MVP Custom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-h2 font-bold mb-4">Esempi di outcome</h2>
            <p className="text-body-lg text-muted-foreground">
              Task tipici che puoi richiedere.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {examples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="surface-card p-5"
              >
                <span className="font-mono text-xs text-primary mb-2 block">
                  {example.type}
                </span>
                <p className="text-sm font-medium">{example.title}</p>
              </motion.div>
            ))}
          </div>
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
              Interessato all'abbonamento?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Parliamone. Ti spiego come funziona e vediamo se fa per te.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Richiedi disponibilità
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
