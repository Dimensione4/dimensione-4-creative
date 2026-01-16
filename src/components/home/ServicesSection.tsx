import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Gauge, Code2, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Tooltip from "@radix-ui/react-tooltip";

const services = [
  {
    icon: Gauge,
    title: "WordPress Performance & SEO",
    description:
      "Siti più veloci, ottimizzati per Core Web Vitals e SEO tecnico.",
    tags: ["Performance", "SEO", "WooCommerce"],
  },
  {
    icon: Code2,
    title: "MVP Custom",
    description: "App web su misura con Next.js o React, rapide da lanciare.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: Palette,
    title: "Frontend Optimization",
    description:
      "Refactoring, accessibilità e design system senza stravolgimenti.",
    tags: ["Refactoring", "A11y", "Design System"],
  },
  {
    icon: Sparkles,
    title: "Esperienza Visiva",
    description:
      "Animazioni fluide, microinterazioni, motion design memorabile.",
    tags: ["Motion", "Framer", "GSAP"],
    isAddon: true,
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-surface/30">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-mono text-label text-primary mb-4 block">
              Servizi
            </span>
            <h2 className="font-display text-h2 font-bold">
              Come posso aiutarti
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/servizi">
              Vedi tutti i servizi
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group surface-card p-8 relative"
              // className={`group surface-card p-8 relative ${
              //   service.isAddon ? "md:col-span-2" : ""
              // }`}
            >
              {/* Add-on badge */}
              {service.isAddon && (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="absolute top-6 right-6 cursor-help">
                      <span className="px-2 py-1 rounded-md bg-warm/10 text-warm text-xs font-mono">
                        Add-on
                      </span>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={8}
                      className="px-3 py-2 rounded-md bg-muted text-xs text-yellow-500 shadow-lg"
                    >
                      Modulo extra abbinabile ad altri servizi.
                      <Tooltip.Arrow className="fill-muted" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              )}

              <div className="flex gap-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {service.title === "MVP Custom" ? (
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <h3 className="font-display text-xl font-semibold mb-2 cursor-help">
                          {service.title}
                        </h3>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="top"
                          sideOffset={8}
                          className="px-3 py-2 rounded-md bg-muted text-xs text-muted-foreground shadow-lg max-w-[400px]"
                        >
                          <span className="text-yellow-500">
                            MVP = Minimum Viable Product.
                          </span>{" "}
                          <br />
                          Una versione essenziale per testare e lanciare
                          rapidamente.
                          <Tooltip.Arrow className="fill-muted" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  ) : (
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                  )}

                  <p className="text-body text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) =>
                      tag === "A11y" ? (
                        <Tooltip.Root key={tag}>
                          <Tooltip.Trigger asChild>
                            <span className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-muted-foreground cursor-help">
                              {tag}
                            </span>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={8}
                              className="px-3 py-2 rounded-md bg-muted text-xs text-muted-foreground shadow-lg max-w-[400px]"
                            >
                              <span className="text-yellow-500">
                                A11y = Accessibility
                              </span>
                              . <br />
                              Rendere siti e app fruibili da tutte le persone,
                              incluse quelle con disabilità.
                              <Tooltip.Arrow className="fill-muted" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      ) : (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-muted-foreground"
                        >
                          {tag}
                        </span>
                      )
                    )}
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
