import { motion } from "framer-motion";
import { FileText, MessageSquare, GitPullRequest, RotateCcw, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    id: "step-1",
    icon: FileText,
    emoji: "📝",
    title: "Task Inviato",
    subtitle: "Ottimizza la performance su mobile",
    timestamp: "Lunedì, 09:15",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-2">Brief ricevuto:</p>
          <p className="text-sm">
            "Il sito carica lentamente su mobile, soprattutto la homepage. 
            Core Web Vitals rossi. Priorità: LCP e CLS."
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Task aggiunto alla coda</span>
        </div>
      </div>
    ),
  },
  {
    id: "step-2",
    icon: MessageSquare,
    emoji: "📬",
    title: "Risposta Iniziale",
    subtitle: "Analisi + proposta in 12h",
    timestamp: "Lunedì, 18:30",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-3">Audit preliminare:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Hero image: 2.4MB, non ottimizzata</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Font loading: render-blocking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Third-party scripts: 800ms delay</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Stima: 2-3 giorni. Procedo con l'ottimizzazione?
        </p>
      </div>
    ),
  },
  {
    id: "step-3",
    icon: GitPullRequest,
    emoji: "🔧",
    title: "Consegna Task",
    subtitle: "PR + test + guida deploy",
    timestamp: "Giovedì, 14:00",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50 font-mono text-xs">
          <p className="text-muted-foreground mb-2">📁 File modificati:</p>
          <div className="space-y-1 text-primary">
            <p>+ src/components/Hero.tsx</p>
            <p>+ public/images/ (WebP conversion)</p>
            <p>+ next.config.js (image optimization)</p>
            <p>+ src/styles/fonts.css</p>
          </div>
        </div>
        <div className="surface-card p-4 bg-surface/50 font-mono text-xs">
          <p className="text-muted-foreground mb-2">✅ Test results:</p>
          <p className="text-green-500">LCP: 2.4s → 1.1s</p>
          <p className="text-green-500">CLS: 0.25 → 0.02</p>
          <p className="text-green-500">Mobile score: 45 → 92</p>
        </div>
      </div>
    ),
  },
  {
    id: "step-4",
    icon: RotateCcw,
    emoji: "🌀",
    title: "Revisione",
    subtitle: "Piccoli fix su richiesta",
    timestamp: "Venerdì, 10:00",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-3">Feedback ricevuto:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>"Puoi aggiungere lazy loading anche alle card prodotto?"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>"Il font fallback ha un flash, riesci a sistemarlo?"</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Fix applicati e pushati. Revisioni illimitate finché sei soddisfatto.
        </p>
      </div>
    ),
  },
  {
    id: "step-5",
    icon: CheckCircle2,
    emoji: "✅",
    title: "Conclusione",
    subtitle: "Task chiuso, documentato",
    timestamp: "Venerdì, 16:30",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-3">Recap finale:</p>
          <ul className="space-y-2 text-sm">
            <li>✅ Performance mobile: da 45 a 92</li>
            <li>✅ Core Web Vitals: tutti verdi</li>
            <li>✅ Documentazione: guida deploy inclusa</li>
            <li>✅ PR: merged in production</li>
          </ul>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary font-mono">
          <span>→ Prossimo slot disponibile: Lunedì mattina</span>
        </div>
      </div>
    ),
  },
];

export function ProcessDemo() {
  return (
    <section className="section-padding bg-surface/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-label text-primary mb-4 block">
            Preview the process
          </span>
          <h2 className="font-display text-h2 font-bold mb-4">
            Una settimana tipo
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            Ecco come si svolge un task reale, dall'invio alla consegna.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {steps.map((step, index) => (
              <AccordionItem
                key={step.id}
                value={step.id}
                className="surface-card border-none overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline px-6 py-5 [&[data-state=open]>div>.step-icon]:bg-primary [&[data-state=open]>div>.step-icon]:text-primary-foreground">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="step-icon w-10 h-10 rounded-lg bg-surface flex items-center justify-center transition-colors duration-200 shrink-0">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{step.emoji}</span>
                        <span className="font-display font-semibold">{step.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {step.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                      {step.timestamp}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-14"
                  >
                    {step.content}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
