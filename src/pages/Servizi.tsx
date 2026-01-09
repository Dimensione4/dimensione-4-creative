import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge, Code2, Palette, Sparkles, Check, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Gauge,
    title: "WordPress Performance & SEO",
    description: "Ottimizzazione velocità, Core Web Vitals, SEO tecnico per WordPress e WooCommerce. Trasformo siti lenti in esperienze fluide che convertono.",
    outputs: [
      "Audit performance completo",
      "Ottimizzazione Core Web Vitals",
      "SEO tecnico on-page",
      "Caching e CDN setup",
      "Database optimization",
    ],
    benefits: [
      "Pagine più veloci = più conversioni",
      "Miglior ranking su Google",
      "Esperienza utente superiore",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    delivery: "2-4 settimane per audit + ottimizzazione completa",
  },
  {
    icon: Code2,
    title: "MVP Custom",
    description: "Applicazioni web su misura per chi ha un'idea chiara da realizzare in tempo breve. Dal concept al lancio con tecnologie moderne.",
    outputs: [
      "Web app funzionante",
      "Codebase scalabile",
      "Deploy su infrastruttura cloud",
      "Documentazione tecnica",
      "Handover completo",
    ],
    benefits: [
      "Time-to-market rapido",
      "Codice pronto per scalare",
      "Niente debito tecnico nascosto",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    delivery: "4-12 settimane in base a complessità",
  },
  {
    icon: Palette,
    title: "Frontend Optimization",
    description: "Refactoring, accessibilità, design system. Miglioro codebase esistenti senza stravolgimenti, rendendole più mantenibili e performanti.",
    outputs: [
      "Code review dettagliata",
      "Refactoring componenti",
      "Design system documentation",
      "Audit accessibilità",
      "Test coverage migliorata",
    ],
    benefits: [
      "Codebase più leggibile",
      "Meno bug, più velocità",
      "Team più produttivo",
    ],
    stack: ["React", "Vue", "Angular", "TypeScript", "CSS/Tailwind"],
    delivery: "2-6 settimane in base a scope",
  },
  {
    icon: Sparkles,
    title: "Esperienza Visiva",
    description: "Motion design, microinterazioni, animazioni fluide. Il layer che trasforma un buon prodotto in uno memorabile.",
    outputs: [
      "Animazioni custom",
      "Microinterazioni UI",
      "Page transitions fluide",
      "Scroll-based effects",
      "Loading states eleganti",
    ],
    benefits: [
      "Brand perception elevata",
      "User engagement superiore",
      "Differenziazione dalla concorrenza",
    ],
    stack: ["Framer Motion", "GSAP", "Lottie", "CSS Animations"],
    delivery: "Add-on: +1-2 settimane su progetti esistenti",
    isAddon: true,
  },
];

export default function Servizi() {
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
              Servizi
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              Come posso aiutarti
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Ogni servizio è progettato per aggiungere prospettiva, struttura e tempo ai tuoi progetti digitali. Scegli in base alle tue esigenze.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card p-8 md:p-10 relative"
              >
                {service.isAddon && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1.5 rounded-lg bg-warm/10 text-warm text-xs font-mono font-medium">
                      Add-on
                    </span>
                  </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold mb-2">
                          {service.title}
                        </h2>
                        <p className="text-body text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="mb-6">
                      <h3 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                        Output
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {service.outputs.map((output) => (
                          <div key={output} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm">{output}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2">
                      {service.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-surface text-xs font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:border-l lg:border-[hsl(var(--border))] lg:pl-8 space-y-6">
                    {/* Benefits */}
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                        Benefici
                      </h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Delivery */}
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                        Tempistiche
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.delivery}
                      </p>
                    </div>
                  </div>
                </div>
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
              Non sai quale servizio fa per te?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Parliamone insieme. Una call di 15 minuti per capire le tue esigenze.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Prenota una call
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
