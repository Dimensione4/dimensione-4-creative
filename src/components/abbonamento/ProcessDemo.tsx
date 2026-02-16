import { motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  GitPullRequest,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
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
    title: "Task inviato",
    subtitle: "Aggiorna pagina Servizi e CTA call",
    timestamp: "Lunedi, 09:15",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-2">
            Brief ricevuto:
          </p>
          <p className="text-sm">
            "Aggiorniamo offerta Servizi, allineiamo le CTA call e rendiamo il
            menu mobile più stabile."
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Task inserito in coda e preso in carico</span>
        </div>
      </div>
    ),
  },
  {
    id: "step-2",
    icon: MessageSquare,
    title: "Risposta iniziale",
    subtitle: "Analisi e piano operativo",
    timestamp: "Lunedi, 16:40",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            Analisi iniziale:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-destructive">*</span>
              <span>CTA non coerenti tra pagine principali</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">*</span>
              <span>Menu mobile con comportamento non uniforme</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">*</span>
              <span>Copy da semplificare in alcune sezioni</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Stima condivisa: 2-4 giorni con rilascio progressivo.
        </p>
      </div>
    ),
  },
  {
    id: "step-3",
    icon: GitPullRequest,
    title: "Consegna",
    subtitle: "Rilascio incrementale e verifica",
    timestamp: "Giovedi, 14:00",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50 font-mono text-xs">
          <p className="text-muted-foreground mb-2">
            File principali aggiornati:
          </p>
          <div className="space-y-1 text-primary">
            <p>+ src/pages/Servizi.tsx</p>
            <p>+ src/components/layout/Header.tsx</p>
            <p>+ src/pages/Metodo.tsx</p>
            <p>+ src/pages/Abbonamento.tsx</p>
          </div>
        </div>
        <div className="surface-card p-4 bg-surface/50 font-mono text-xs">
          <p className="text-muted-foreground mb-2">Verifica:</p>
          <p className="text-green-500">Menu mobile stabile</p>
          <p className="text-green-500">CTA call uniformate</p>
          <p className="text-green-500">Nessuna regressione in build</p>
        </div>
      </div>
    ),
  },
  {
    id: "step-4",
    icon: RotateCcw,
    title: "Revisione",
    subtitle: "Fine tuning su feedback",
    timestamp: "Venerdi, 10:20",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            Feedback:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Rendere più chiaro il blocco prezzi in Abbonamento</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Rifinire la hero Metodo su mobile</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Correzioni applicate e validate in giornata.
        </p>
      </div>
    ),
  },
  {
    id: "step-5",
    icon: CheckCircle2,
    title: "Conclusione",
    subtitle: "Task chiuso e tracciato",
    timestamp: "Venerdi, 17:10",
    content: (
      <div className="space-y-4">
        <div className="surface-card p-4 bg-surface/50">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            Recap finale:
          </p>
          <ul className="space-y-2 text-sm">
            <li>* Obiettivo completato</li>
            <li>* Feedback recepito</li>
            <li>* Rilascio eseguito</li>
            <li>* Prossimo task pronto in coda</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export function ProcessDemo() {
  return (
    <section className="section-padding bg-surface/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-label text-primary mb-4 block">
            Processo operativo
          </span>
          <h2 className="font-display text-h2 font-bold mb-4">
            Una settimana tipo
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            Ecco come viene gestito un task reale, dalla richiesta alla
            chiusura.
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
            {steps.map((step) => (
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
                        <span className="font-display font-semibold">
                          {step.title}
                        </span>
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
