import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ArrowRight, ArrowUpRight, Gauge, Code2, Palette, Sparkles, Check, PhoneCall } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { localizedRoutes } from "@/lib/routes/routes";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { trackEvent } from "@/utils/analytics";

export default function Servizi() {
  const { i18n } = useTranslation();
  const { isVisible } = usePageVisibility();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];
  const bookingLink = `${routes.contacts}#calendly`;
  const canShowProjects = isVisible("projects");

  const services = isItalian
    ? [
        {
          icon: Gauge,
          title: "WordPress Performance & SEO",
          description:
            "Ottimizzazione velocità, Core Web Vitals e SEO tecnico per WordPress e WooCommerce.",
          outputs: ["Audit performance completo", "Ottimizzazione Core Web Vitals", "SEO tecnico on-page", "Caching e CDN setup", "Database optimization"],
          benefits: ["Pagine più veloci = più conversioni", "Miglior ranking su Google", "Esperienza utente superiore"],
          stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
          delivery: "2-4 settimane per audit + ottimizzazione completa",
        },
        {
          icon: Code2,
          title: "MVP Custom",
          description:
            "Applicazioni web su misura per chi ha un'idea chiara da realizzare in tempo breve.",
          outputs: ["Web app funzionante", "Codebase scalabile", "Deploy cloud", "Documentazione tecnica", "Handover completo"],
          benefits: ["Time-to-market rapido", "Codice pronto per crescere", "Niente debito tecnico nascosto"],
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
          delivery: "4-12 settimane in base alla complessità",
        },
        {
          icon: Palette,
          title: "Frontend Optimization",
          description: "Refactoring, accessibilità e design system su codebase esistenti.",
          outputs: ["Code review dettagliata", "Refactoring componenti", "Design system docs", "Audit accessibilità", "Test coverage migliorata"],
          benefits: ["Codebase più leggibile", "Meno bug, più velocità", "Team più produttivo"],
          stack: ["React", "Vue", "Angular", "TypeScript", "CSS/Tailwind"],
          delivery: "2-6 settimane in base allo scope",
        },
        {
          icon: Sparkles,
          title: "Esperienza Visiva",
          description: "Motion design, micro-interazioni e animazioni fluide.",
          outputs: ["Animazioni custom", "Microinterazioni UI", "Page transitions", "Scroll effects", "Loading states"],
          benefits: ["Brand perception elevata", "Maggiore engagement", "Differenziazione"],
          stack: ["Framer Motion", "GSAP", "Lottie", "CSS Animations"],
          delivery: "Add-on: +1-2 settimane su progetti esistenti",
          isAddon: true,
        },
      ]
    : [
        {
          icon: Gauge,
          title: "WordPress Performance & SEO",
          description:
            "Speed optimization, Core Web Vitals, and technical SEO for WordPress and WooCommerce.",
          outputs: ["Full performance audit", "Core Web Vitals optimization", "On-page technical SEO", "Caching and CDN setup", "Database optimization"],
          benefits: ["Faster pages = more conversions", "Better Google ranking", "Stronger user experience"],
          stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
          delivery: "2-4 weeks for audit + full optimization",
        },
        {
          icon: Code2,
          title: "Custom MVP",
          description:
            "Tailored web apps for teams with a clear idea and short time-to-market.",
          outputs: ["Working web app", "Scalable codebase", "Cloud deploy", "Technical docs", "Complete handover"],
          benefits: ["Fast time-to-market", "Code ready to grow", "No hidden technical debt"],
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
          delivery: "4-12 weeks depending on complexity",
        },
        {
          icon: Palette,
          title: "Frontend Optimization",
          description: "Refactoring, accessibility, and design systems for existing codebases.",
          outputs: ["Detailed code review", "Component refactoring", "Design system docs", "Accessibility audit", "Improved test coverage"],
          benefits: ["Cleaner codebase", "Fewer bugs, higher speed", "More productive team"],
          stack: ["React", "Vue", "Angular", "TypeScript", "CSS/Tailwind"],
          delivery: "2-6 weeks depending on scope",
        },
        {
          icon: Sparkles,
          title: "Visual Experience",
          description: "Motion design, micro-interactions, and fluid animations.",
          outputs: ["Custom animations", "UI micro-interactions", "Page transitions", "Scroll effects", "Loading states"],
          benefits: ["Higher brand perception", "Higher engagement", "Clear differentiation"],
          stack: ["Framer Motion", "GSAP", "Lottie", "CSS Animations"],
          delivery: "Add-on: +1-2 weeks on existing projects",
          isAddon: true,
        },
      ];

  return (
    <Layout>
      <SEO
        title={isItalian ? "Servizi" : "Services"}
        description={
          isItalian
            ? "Performance WordPress, MVP custom, frontend optimization e motion design."
            : "WordPress performance, custom MVP, frontend optimization, and motion design."
        }
        canonical={routes.services}
      />
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
              <span className="font-mono text-label text-primary mb-4 block">{isItalian ? "Servizi" : "Services"}</span>
              <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
                {isItalian ? "Interventi chiari per risultati" : "Clear execution for"} <span className="text-primary">{isItalian ? "misurabili" : "measurable results"}</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                {isItalian
                  ? "Niente pacchetti standard: definiamo scope, priorità e percorso pratico insieme."
                  : "No generic packages: we define scope, priorities, and practical execution together."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link
                    to={bookingLink}
                    onClick={() =>
                      trackEvent("book_call_click", {
                        tool: "calendly",
                        location: "hero",
                      })
                    }
                  >
                    {isItalian ? "Prenota una call strategica" : "Book a strategy call"}
                    <PhoneCall className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link
                    to={canShowProjects ? routes.projects : routes.method}
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_text: canShowProjects
                          ? isItalian
                            ? "Vedi i progetti"
                            : "View projects"
                          : isItalian
                          ? "Scopri il metodo"
                          : "Explore the method",
                        cta_section: "hero",
                      })
                    }
                  >
                    {canShowProjects
                      ? isItalian
                        ? "Vedi i progetti"
                        : "View projects"
                      : isItalian
                        ? "Scopri il metodo"
                        : "Explore the method"}
                    {canShowProjects ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="surface-card p-6 md:p-7">
              <p className="font-mono text-label text-primary mb-4">{isItalian ? "Cosa ottieni subito" : "What you get quickly"}</p>
              <div className="space-y-3 text-sm md:text-base">
                {[isItalian ? "Priorità e piano operativo in tempi brevi" : "Priorities and execution plan in short time", isItalian ? "Comunicazione diretta, senza passaggi inutili" : "Direct communication, no unnecessary layers", isItalian ? "Implementazione orientata a KPI reali" : "Implementation aligned to real KPIs"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 * index }} className="surface-card p-8 md:p-10 relative" data-snap-anchor>
                {service.isAddon && (
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="absolute top-6 right-6 cursor-help">
                        <span className="px-3 py-1.5 rounded-lg bg-warm/10 text-warm text-xs font-mono font-medium">Add-on</span>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content side="top" sideOffset={8} className="px-3 py-2 rounded-md bg-muted text-xs text-yellow-500 shadow-lg">
                        {isItalian ? "Modulo extra abbinabile ad altri servizi." : "Extra module combinable with other services."}
                        <Tooltip.Arrow className="fill-muted" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold mb-2">{service.title}</h2>
                        <p className="text-body text-muted-foreground">{service.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Output</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {service.outputs.map((output) => (
                          <div key={output} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm">{output}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-surface text-xs font-mono text-muted-foreground">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:border-l lg:border-[hsl(var(--border))] lg:pl-8 space-y-6">
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">{isItalian ? "Benefici" : "Benefits"}</h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">{isItalian ? "Tempistiche" : "Timeline"}</h3>
                      <p className="text-sm text-muted-foreground">{service.delivery}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" data-snap-label="CTA">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="surface-card p-10 md:p-14 text-center">
            <h2 className="font-display text-h2 font-bold mb-4">{isItalian ? "Non sai quale servizio fa per te?" : "Not sure which service fits you?"}</h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              {isItalian ? "Parliamone insieme. Una call veloce per capire le tue esigenze." : "Let's discuss it. A quick call to understand your needs."}
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
