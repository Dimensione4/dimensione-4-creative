import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  X,
  RefreshCcw,
  Code2,
  FileText,
  TestTube,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProcessDemo } from "@/components/abbonamento/ProcessDemo";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { localizedRoutes } from "@/lib/routes/routes";

export default function Abbonamento() {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];

  const rules = isItalian
    ? [
        {
          icon: RefreshCcw,
          title: "1 task attivo per volta",
          descriptionTop: "Lavoro su una richiesta alla volta, con focus totale.",
          descriptionBottom: "La coda è illimitata: aggiungi quante richieste vuoi.",
        },
        {
          icon: Code2,
          title: "Comunicazione async",
          descriptionTop: "Niente call obbligatorie, niente Slack urgente.",
          descriptionBottom: "Aggiornamenti scritti, documentati, entro 24h.",
        },
        {
          icon: FileText,
          title: "Consegna completa",
          descriptionTop: "Ogni task viene consegnato PR-ready con test e guida deploy.",
          descriptionBottom: "Niente work-in-progress indefinito.",
        },
        {
          icon: TestTube,
          title: "Revisioni illimitate",
          descriptionTop: "Finché la richiesta originale non è perfetta.",
          descriptionBottom: "Entro 14-30 giorni dalla consegna.",
        },
      ]
    : [
        {
          icon: RefreshCcw,
          title: "1 active task at a time",
          descriptionTop: "I work on one request at a time with full focus.",
          descriptionBottom: "The queue is unlimited: add as many requests as you want.",
        },
        {
          icon: Code2,
          title: "Async communication",
          descriptionTop: "No mandatory calls, no urgent Slack.",
          descriptionBottom: "Written and documented updates within 24h.",
        },
        {
          icon: FileText,
          title: "Complete delivery",
          descriptionTop: "Each task is delivered PR-ready with tests and deploy notes.",
          descriptionBottom: "No endless work-in-progress.",
        },
        {
          icon: TestTube,
          title: "Unlimited revisions",
          descriptionTop: "Until the original request is exactly right.",
          descriptionBottom: "Within 14-30 days after delivery.",
        },
      ];

  const included = isItalian
    ? [
        "Richieste illimitate (1 attiva per volta)",
        "Revisioni illimitate per richiesta",
        "Comunicazione async prioritaria",
        "Consegna PR-ready con test",
        "Documentazione inclusa",
        "Bug fixing garantito",
        "Task frontend e backend applicativo",
        "Refactoring React/Next.js/TypeScript",
      ]
    : [
        "Unlimited requests (1 active at a time)",
        "Unlimited revisions per request",
        "Priority async communication",
        "PR-ready delivery with tests",
        "Documentation included",
        "Guaranteed bug fixing",
        "Frontend and app-backend tasks",
        "React/Next.js/TypeScript refactoring",
      ];

  const excluded = isItalian
    ? [
        "Progetti epici indefiniti",
        "Redesign completi da zero",
        "Operatività CMS (WordPress/WooCommerce)",
        "Supporto editoriale e contenuti",
        "Backend enterprise fuori scope concordato",
        "Call giornaliere obbligatorie",
        "Lavoro senza scope definito",
      ]
    : [
        "Undefined epic projects",
        "Full redesigns from scratch",
        "CMS operations (WordPress/WooCommerce)",
        "Editorial and content support",
        "Enterprise backend outside agreed scope",
        "Mandatory daily calls",
        "Work without defined scope",
      ];

  const examples = isItalian
    ? [
        { title: "Fix performance mobile", type: "Performance" },
        { title: "Risoluzione bug frontend", type: "Frontend" },
        { title: "Bug fixing API", type: "Backend" },
        { title: "Refactor componenti React", type: "Code Quality" },
        { title: "Integrazione servizi esterni", type: "Integration" },
        { title: "Implementazione design system", type: "Frontend" },
        { title: "Ottimizzazione Core Web Vitals", type: "Performance" },
        { title: "Automazioni e workflow", type: "Automation" },
      ]
    : [
        { title: "Mobile performance fix", type: "Performance" },
        { title: "Frontend bug resolution", type: "Frontend" },
        { title: "API bug fixing", type: "Backend" },
        { title: "React components refactor", type: "Code Quality" },
        { title: "External services integration", type: "Integration" },
        { title: "Design system implementation", type: "Frontend" },
        { title: "Core Web Vitals optimization", type: "Performance" },
        { title: "Automation and workflows", type: "Automation" },
      ];

  return (
    <Layout>
      <SEO
        title={isItalian ? "Abbonamento" : "Subscription"}
        description={
          isItalian
            ? "Developer in abbonamento: richieste illimitate, comunicazione async, consegna PR-ready."
            : "Subscription developer: unlimited requests, async communication, PR-ready delivery."
        }
        canonical={routes.subscription}
      />

      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-label text-primary mb-4 block">
              {isItalian ? "Developer in abbonamento" : "Subscription developer"}
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              {isItalian
                ? "Non è un retainer. È un sistema di miglioramento continuo."
                : "Not a retainer. A continuous improvement system."}
            </h1>
            <p className="text-body-lg text-muted-foreground">
              {isItalian
                ? "Accesso diretto a un developer senior solo per codice: frontend, backend applicativo, integrazioni, performance."
                : "Direct access to a senior developer for code only: frontend, app backend, integrations, performance."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              {isItalian ? "Come funziona" : "How it works"}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl">
              {isItalian ? "Regole semplici, risultati prevedibili." : "Simple rules, predictable results."}
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <rule.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-gradient text-lg font-semibold">{rule.title}</h3>
                </div>
                <p className="text-body text-muted-foreground">
                  {rule.descriptionTop}
                  <br />
                  {rule.descriptionBottom}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessDemo />

      <section className="section-padding bg-surface/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="surface-card p-8"
            >
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                {isItalian ? "Incluso" : "Included"}
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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="surface-card p-8"
            >
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                {isItalian ? "Non incluso" : "Not included"}
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
                {isItalian ? "Per progetti complessi, considera il servizio" : "For complex projects, consider the"}{" "}
                <Link to={routes.mvp} className="underline hover:text-primary transition-colors">
                  MVP Custom
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              {isItalian ? "Esempi di outcome" : "Example outcomes"}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {isItalian ? "Task tipici che puoi richiedere." : "Typical tasks you can request."}
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
                <span className="font-mono text-xs text-primary mb-2 block">{example.type}</span>
                <p className="text-sm font-medium">{example.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="surface-card p-8 md:p-10"
          >
            <h2 className="font-display text-2xl md:text-h3 font-bold mb-6">
              {isItalian ? "Termini servizio abbonamento" : "Subscription terms"}
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-sm text-muted-foreground">
              {isItalian ? (
                <>
                  <p><span className="text-primary">Modalità operativa:</span> async-first. Ogni richiesta ha briefing, stima e aggiornamenti scritti.</p>
                  <p><span className="text-primary">Capacità:</span> una richiesta attiva per volta. Coda illimitata e priorità definita insieme.</p>
                  <p><span className="text-primary">Revisioni:</span> illimitate sulla richiesta originale, entro la finestra concordata dopo consegna.</p>
                  <p><span className="text-primary">Perimetro:</span> solo codice. Non include gestione contenuti CMS o attività redazionali.</p>
                  <p><span className="text-primary">Pagamenti e rinnovo:</span> canone mensile anticipato. Stop o pausa possibili al rinnovo successivo.</p>
                  <p><span className="text-primary">Ownership:</span> codice e asset custom restano al cliente al saldo delle competenze.</p>
                </>
              ) : (
                <>
                  <p><span className="text-primary">Operating mode:</span> async-first. Every request includes briefing, estimate, and written updates.</p>
                  <p><span className="text-primary">Capacity:</span> one active request at a time. Unlimited queue and shared prioritization.</p>
                  <p><span className="text-primary">Revisions:</span> unlimited on the original request, within the agreed delivery window.</p>
                  <p><span className="text-primary">Scope:</span> code only. No CMS content management or editorial activities.</p>
                  <p><span className="text-primary">Payments and renewal:</span> monthly fee paid in advance. Stop or pause at next renewal.</p>
                  <p><span className="text-primary">Ownership:</span> custom code and assets remain the client property after balance payment.</p>
                </>
              )}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              {isItalian ? "I dettagli legali completi restano nei" : "Full legal details are available in the"}{" "}
              <Link to={routes.terms} className="underline hover:text-primary transition-colors">
                {isItalian ? "Termini e Condizioni" : "Terms & Conditions"}
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="surface-card p-10 md:p-14 text-center"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              {isItalian ? "Interessato all'abbonamento?" : "Interested in subscription?"}
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              {isItalian
                ? "Parliamone. Ti spiego come funziona e vediamo se fa per te."
                : "Let's talk. I'll explain how it works and if it's the right fit for you."}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to={routes.contacts}>
                {isItalian ? "Richiedi disponibilità" : "Request availability"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
