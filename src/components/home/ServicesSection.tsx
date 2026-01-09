import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Gauge, Code2, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Gauge,
    title: "WordPress Performance & SEO",
    description: "Ottimizzazione velocità, Core Web Vitals, SEO tecnico. Trasformo siti lenti in esperienze fluide.",
    tags: ["Performance", "SEO", "WooCommerce"],
  },
  {
    icon: Code2,
    title: "MVP Custom",
    description: "Applicazioni web su misura con Next.js o React. Dal concept al lancio in tempi definiti.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: Palette,
    title: "Frontend Optimization",
    description: "Refactoring, accessibilità, design system. Miglioro codebase esistenti senza stravolgimenti.",
    tags: ["Refactoring", "A11y", "Design System"],
  },
  {
    icon: Sparkles,
    title: "Esperienza Visiva",
    description: "Motion design, microinterazioni, animazioni fluide. Il layer che trasforma buono in memorabile.",
    tags: ["Motion", "Framer", "GSAP"],
    isAddon: true,
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-surface/30">
      <div className="container-tight">
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
              className={`group surface-card p-8 relative ${
                service.isAddon ? "md:col-span-2" : ""
              }`}
            >
              {/* Add-on badge */}
              {service.isAddon && (
                <div className="absolute top-6 right-6">
                  <span className="px-2 py-1 rounded-md bg-warm/10 text-warm text-xs font-mono">
                    Add-on
                  </span>
                </div>
              )}

              <div className="flex gap-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-body text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
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
