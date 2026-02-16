import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Check,
  X,
  RefreshCcw,
  Code2,
  FileText,
  TestTube,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProcessDemo } from "@/components/abbonamento/ProcessDemo";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { localizedRoutes } from "@/lib/routes/routes";
import { trackEvent } from "@/utils/analytics";

type PlanKey = "monthly" | "weekly" | "consulting";

export default function Abbonamento() {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];
  const bookingLink = `${routes.contacts}#calendly`;
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("monthly");

  const plans = isItalian
    ? {
        monthly: {
          label: "Mensile",
          price: "€ 2.800",
          unit: "/ mese",
          note: "Piano continuativo per evolvere prodotto e performance.",
          cta: "Prenota una call",
          includes: [
            "1 task attivo per volta (coda illimitata)",
            "Sviluppo full-stack su priorità condivise",
            "Revisioni sulla richiesta originale",
          ],
        },
        weekly: {
          label: "Settimanale",
          price: "€ 800",
          unit: "/ settimana",
          note: "Sprint mirato per avanzare rapidamente su un obiettivo.",
          cta: "Prenota una call",
          includes: [
            "Sprint tecnico ad alta priorità",
            "Consegna rapida su scope definito",
            "Supporto async durante la settimana",
          ],
        },
        consulting: {
          label: "Consulenza",
          price: "€ 100",
          unit: "/ ora",
          note: "Assistenza tecnica e consulenza strategica operativa.",
          cta: "Prenota consulenza",
          includes: [
            "Analisi tecnica e piano operativo",
            "Revisione architettura e codice",
            "Call 1:1 con prossimi step concreti",
          ],
        },
      }
    : {
        monthly: {
          label: "Monthly",
          price: "€ 2,800",
          unit: "/ month",
          note: "Continuous plan to improve product and performance.",
          cta: "Book a call",
          includes: [
            "1 active task at a time (unlimited queue)",
            "Full-stack development on shared priorities",
            "Revisions on the original request",
          ],
        },
        weekly: {
          label: "Weekly",
          price: "€ 800",
          unit: "/ week",
          note: "Focused sprint to move quickly on one goal.",
          cta: "Book a call",
          includes: [
            "High-priority technical sprint",
            "Fast delivery on a defined scope",
            "Async support during the week",
          ],
        },
        consulting: {
          label: "Consulting",
          price: "€ 100",
          unit: "/ hour",
          note: "Technical assistance and strategic consulting.",
          cta: "Book consulting",
          includes: [
            "Technical analysis and action plan",
            "Architecture and code review",
            "1:1 call with concrete next steps",
          ],
        },
      };

  const activePlan = plans[selectedPlan];

  const rules = isItalian
    ? [
        {
          icon: RefreshCcw,
          title: "1 task attivo per volta",
          descriptionTop:
            "Lavoro su una richiesta alla volta, con focus totale.",
          descriptionBottom:
            "La coda e illimitata: puoi aggiungere nuove richieste in qualsiasi momento.",
        },
        {
          icon: Code2,
          title: "Comunicazione asincrona",
          descriptionTop: "Niente call obbligatorie o passaggi superflui.",
          descriptionBottom:
            "Aggiornamenti scritti, tracciabili, con risposte rapide.",
        },
        {
          icon: FileText,
          title: "Consegna pronta",
          descriptionTop: "Ogni task arriva pronto per rilascio e utilizzo.",
          descriptionBottom: "Documentazione operativa inclusa quando serve.",
        },
        {
          icon: TestTube,
          title: "Revisioni sulla richiesta",
          descriptionTop:
            "Rifiniamo finche l'obiettivo definito non e centrato.",
          descriptionBottom: "Niente consegne lasciate a meta.",
        },
      ]
    : [
        {
          icon: RefreshCcw,
          title: "1 active task at a time",
          descriptionTop: "I work on one request at a time with full focus.",
          descriptionBottom:
            "Queue is unlimited: you can add requests anytime.",
        },
        {
          icon: Code2,
          title: "Asynchronous communication",
          descriptionTop: "No mandatory calls or unnecessary layers.",
          descriptionBottom: "Written, traceable updates with fast replies.",
        },
        {
          icon: FileText,
          title: "Ready-to-ship delivery",
          descriptionTop: "Each task is delivered ready to release and use.",
          descriptionBottom: "Operational documentation included when needed.",
        },
        {
          icon: TestTube,
          title: "Request-focused revisions",
          descriptionTop: "We refine until the defined goal is met.",
          descriptionBottom: "No half-finished delivery.",
        },
      ];

  const included = isItalian
    ? [
        "Richieste illimitate (1 attiva per volta)",
        "Revisioni sulla richiesta originale",
        "Comunicazione prioritaria",
        "Task frontend e backend applicativo",
        "Bug fixing e miglioramenti continui",
        "Documentazione essenziale",
      ]
    : [
        "Unlimited requests (1 active at a time)",
        "Revisions on the original request",
        "Priority communication",
        "Frontend and app-backend tasks",
        "Bug fixing and continuous improvements",
        "Essential documentation",
      ];

  const excluded = isItalian
    ? [
        "Gestione contenuti CMS redazionale",
        "Redesign completi senza priorità",
        "Progetti enterprise fuori perimetro concordato",
        "Supporto operativo 24/7",
      ]
    : [
        "Editorial CMS content operations",
        "Full redesigns without prioritization",
        "Enterprise projects outside agreed scope",
        "24/7 operational support",
      ];

  const examples = isItalian
    ? [
        {
          title: "Riduzione tempi di caricamento homepage",
          type: "Performance",
        },
        { title: "Refactoring flusso checkout e form", type: "Frontend" },
        { title: "Integrazione Stripe e webhook", type: "Backend" },
        { title: "Dashboard KPI con Supabase", type: "Data" },
        { title: "Setup logging errori e alert", type: "Affidabilita" },
        { title: "Migliorie SEO tecnico su pagine core", type: "SEO tecnico" },
        { title: "Ottimizzazione query PostgreSQL", type: "Database" },
        { title: "Hardening base autenticazione API", type: "Sicurezza" },
      ]
    : [
        { title: "Homepage loading time reduction", type: "Performance" },
        { title: "Checkout and form flow refactor", type: "Frontend" },
        { title: "Stripe and webhook integration", type: "Backend" },
        { title: "KPI dashboard with Supabase", type: "Data" },
        { title: "Error logging and alerts setup", type: "Reliability" },
        { title: "Core technical SEO improvements", type: "Technical SEO" },
        { title: "PostgreSQL query optimization", type: "Database" },
        { title: "API auth baseline hardening", type: "Security" },
      ];

  return (
    <Layout>
      <SEO
        title={isItalian ? "Abbonamento" : "Subscription"}
        description={
          isItalian
            ? "Developer full-stack in abbonamento: pricing chiaro, execution rapida, miglioramento continuo."
            : "Subscription full-stack developer: clear pricing, fast execution, continuous improvement."
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
              {isItalian
                ? "Full-stack in abbonamento"
                : "Subscription full-stack developer"}
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              {isItalian
                ? "Il tuo full-stack developer che fa crescere il tuo prodotto"
                : "Your developer of trust, growing your product."}
            </h1>
            <p className="text-body-lg text-muted-foreground">
              {isItalian
                ? "5 anni di esperienza. Accesso diretto su codice, performance, integrazioni e crescita continua del prodotto."
                : "5 years of experience. Direct access for code, performance, integrations, and continuous product improvement."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-surface/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-h2 font-bold mb-3">
              {isItalian
                ? "Prezzo fisso senza sorprese"
                : "Fixed pricing, no surprises"}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {isItalian
                ? "Mensile, settimanale o consulenza: scegli la formula giusta per il tuo momento."
                : "Monthly, weekly, or consulting: pick the format for your current stage."}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="surface-card p-6 md:p-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {isItalian
                  ? "Disponibile per nuovi task"
                  : "Available for new tasks"}
              </span>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p>
                  {isItalian
                    ? "Lavori con me direttamente: full-stack developer con approccio pratico e misurabile."
                    : "You work directly with me: full-stack developer with a practical, measurable approach."}
                </p>
                <p>
                  {isItalian
                    ? "Niente passaggi intermedi, solo priorità chiare e consegne concrete."
                    : "No extra layers, only clear priorities and concrete delivery."}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-[hsl(var(--border))] bg-surface-hover/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isItalian
                      ? "Hai dubbi sul modello in abbonamento? Facciamo una call e valutiamo subito se e il fit giusto."
                      : "Not sure about the subscription model? Let's do a call and quickly validate the fit."}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="surface-card p-6 md:p-8"
            >
              <h3 className="font-display text-2xl font-semibold mb-5">
                {isItalian ? "Piani" : "Plans"}
              </h3>

              <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl border border-[hsl(var(--border))] bg-surface-hover/50 p-1">
                {(["monthly", "weekly", "consulting"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPlan(key)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      selectedPlan === key
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {plans[key].label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-end gap-2 mb-2">
                <span className="font-display text-5xl md:text-6xl font-bold leading-none">
                  {activePlan.price}
                </span>
                <span className="text-2xl md:text-3xl font-semibold text-primary leading-none mb-1">
                  {activePlan.unit}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {activePlan.note}
              </p>

              <Button variant="hero" size="lg" className="mb-6" asChild>
                <Link
                  to={bookingLink}
                  onClick={() =>
                    trackEvent("book_call_click", {
                      tool: "calendly",
                      location: "subscription_pricing",
                    })
                  }
                >
                  {activePlan.cta}
                  <PhoneCall className="w-4 h-4" />
                </Link>
              </Button>

              <div className="space-y-3">
                {activePlan.includes.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {isItalian
              ? "Puoi mettere in pausa o interrompere l'abbonamento al rinnovo successivo."
              : "You can pause or stop the subscription at the next renewal."}
          </p>
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
              {isItalian
                ? "Regole semplici, risultati prevedibili."
                : "Simple rules, predictable results."}
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
                  <h3 className="font-display text-gradient text-lg font-semibold">
                    {rule.title}
                  </h3>
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
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                {isItalian
                  ? "Per progetti complessi, valuta il servizio"
                  : "For complex projects, consider"}{" "}
                <Link
                  to={routes.mvp}
                  className="underline hover:text-primary transition-colors"
                >
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
              {isItalian ? "Esempi di task reali" : "Real task examples"}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {isItalian
                ? "Interventi concreti con impatto misurabile."
                : "Concrete interventions with measurable impact."}
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
              {isItalian
                ? "Termini servizio abbonamento"
                : "Subscription terms"}
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-sm text-muted-foreground">
              {isItalian ? (
                <>
                  <p>
                    <span className="text-primary">Modalità operativa:</span>{" "}
                    asincrona. Ogni richiesta ha briefing, stima e aggiornamenti
                    scritti.
                  </p>
                  <p>
                    <span className="text-primary">Capacità:</span> una
                    richiesta attiva per volta. Coda illimitata e priorità
                    condivisa.
                  </p>
                  <p>
                    <span className="text-primary">Revisioni:</span> sulla
                    richiesta originale, entro la finestra concordata dopo
                    consegna.
                  </p>
                  <p>
                    <span className="text-primary">Perimetro:</span> solo
                    codice. Non include gestione contenuti CMS o attività
                    redazionali.
                  </p>
                  <p>
                    <span className="text-primary">Pagamenti e rinnovo:</span>{" "}
                    canone anticipato. Stop o pausa possibili al rinnovo
                    successivo.
                  </p>
                  <p>
                    <span className="text-primary">Ownership:</span> codice e
                    asset custom restano al cliente al saldo delle competenze.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="text-primary">Operating mode:</span>{" "}
                    asynchronous. Every request includes briefing, estimate, and
                    written updates.
                  </p>
                  <p>
                    <span className="text-primary">Capacity:</span> one active
                    request at a time. Unlimited queue and shared
                    prioritization.
                  </p>
                  <p>
                    <span className="text-primary">Revisions:</span> on the
                    original request, within the agreed delivery window.
                  </p>
                  <p>
                    <span className="text-primary">Scope:</span> code only. No
                    CMS content management or editorial activities.
                  </p>
                  <p>
                    <span className="text-primary">Payments and renewal:</span>{" "}
                    fee paid in advance. Stop or pause at next renewal.
                  </p>
                  <p>
                    <span className="text-primary">Ownership:</span> custom code
                    and assets remain client property after final payment.
                  </p>
                </>
              )}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              {isItalian
                ? "I dettagli legali completi restano nei"
                : "Full legal details are available in"}{" "}
              <Link
                to={routes.terms}
                className="underline hover:text-primary transition-colors"
              >
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
              {isItalian ? "Vuoi partire ora?" : "Ready to start now?"}
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              {isItalian
                ? "Prenota una call: allineiamo priorità, tempi e prossime consegne."
                : "Book a call: align priorities, timing, and next deliveries."}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link
                to={bookingLink}
                onClick={() =>
                  trackEvent("book_call_click", {
                    tool: "calendly",
                    location: "cta_section",
                  })
                }
              >
                {isItalian ? "Prenota una call" : "Book a call"}
                <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
