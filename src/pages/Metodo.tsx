import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Map,
  Hammer,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  Clock,
  User,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const steps = [
  {
    icon: Map,
    step: "01",
    title: "Mappa",
    subtitle: "Discovery & Scope",
    description:
      "Ogni progetto inizia con una comprensione profonda del contesto. Non scrivo codice prima di aver capito dove vuoi arrivare.",
    activities: [
      "Call iniziale per comprendere obiettivi e vincoli",
      "Analisi dello stato attuale (se esiste)",
      "Definizione scope e deliverable specifici",
      "Proposta tecnica con timeline realistica",
      "Allineamento su priorità e metriche di successo",
    ],
    duration: "1-3 giorni",
    output: "Scope definito + proposta formale",
  },
  {
    icon: Hammer,
    step: "02",
    title: "Costruisci",
    subtitle: "Development & Testing",
    description:
      "Sviluppo iterativo con visibilità continua. Ogni consegna è testata, documentata e pronta per il deploy.",
    activities: [
      "Sviluppo incrementale con checkpoint regolari",
      "Test automatizzati su ogni feature",
      "Code review e quality assurance",
      "Documentazione inline e README",
      "Demo e feedback loop con il cliente",
    ],
    duration: "Variabile per progetto",
    output: "Codice PR-ready + test + docs",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Evolvi",
    subtitle: "Iteration & Growth",
    description:
      "Il lancio è l'inizio, non la fine. I progetti migliori crescono nel tempo con iterazioni basate sui dati.",
    activities: [
      "Deploy guidato con checklist",
      "Monitoring iniziale e bug fixing",
      "Raccolta feedback utenti reali",
      "Prioritizzazione miglioramenti",
      "Supporto continuativo (opzionale)",
    ],
    duration: "Ongoing",
    output: "Miglioramenti misurabili + supporto",
  },
];

const principles = [
  {
    icon: MessageSquare,
    title: "Async-first",
    description:
      "Comunicazione scritta, documentata, senza riunioni inutili. Aggiornamenti regolari, risposte entro 24h.",
  },
  {
    icon: User,
    title: "Accesso diretto",
    description:
      "Lavori con me, non con un account manager. Un unico interlocutore responsabile dall'inizio alla fine.",
  },
  {
    icon: Clock,
    title: "Tempi chiari",
    description:
      "Timeline realistiche, non promesse gonfiate. Se qualcosa cambia, lo saprai subito.",
  },
];

export default function Metodo() {
  return (
    <Layout>
      <SEO
        title="Metodo"
        description="Mappa, Costruisci, Itera. Il mio approccio: comunicazione async, accesso diretto, timeline chiare."
        canonical="/metodo"
      />
      {/* Hero */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-label text-primary mb-4 block">
              Il metodo
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              Mappa → Costruisci → Evolvi
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Un processo semplice e trasparente. Niente sorprese, niente zone
              grigie. Sai sempre dove siamo e dove stiamo andando.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card p-8 md:p-10 relative"
              >
                {/* Step indicator */}
                <div className="absolute -left-3 md:left-5 top-9 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
                  <span className="font-mono text-sm text-primary-foreground font-bold">
                    {step.step}
                  </span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 ml-6 md:ml-8">
                  {/* Main content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="font-display text-2xl font-bold">
                        {step.title}
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        — {step.subtitle}
                      </span>
                    </div>
                    <p className="text-body text-muted-foreground mb-6">
                      {step.description}
                    </p>

                    <h3 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                      Attività
                    </h3>
                    <ul className="space-y-2">
                      {step.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:border-l lg:border-[hsl(var(--border))] lg:pl-8 space-y-6">
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                        Durata tipica
                      </h3>
                      <p className="text-lg font-display font-semibold text-primary">
                        {step.duration}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                        Output
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.output}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-surface/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              Principi di lavoro
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Come preferisco lavorare per garantire risultati eccellenti.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-gradient font-semibold mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Ti sembra un buon match?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Parliamone. 15 minuti per capire se possiamo lavorare insieme.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Prenota una call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
