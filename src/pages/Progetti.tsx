import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Clock, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  clientType: string;
  stack: string[];
  results: { icon: typeof TrendingUp; label: string; value: string }[];
  thumbnail: string;
  featured: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "ecommerce-performance",
    title: "E-commerce Performance Boost",
    subtitle: "Ottimizzazione Core Web Vitals per un negozio WooCommerce con 10k+ prodotti",
    clientType: "E-commerce",
    stack: ["WordPress", "WooCommerce", "PHP", "Performance Audit"],
    results: [
      { icon: Zap, label: "Load time", value: "3s → 1.2s" },
      { icon: TrendingUp, label: "Core Web Vitals", value: "All Green" },
      { icon: Clock, label: "Durata progetto", value: "3 settimane" },
    ],
    thumbnail: "/placeholder.svg",
    featured: true,
  },
  {
    id: "2",
    slug: "saas-mvp-launch",
    title: "SaaS MVP Launch",
    subtitle: "Dalla validazione al lancio di una piattaforma B2B per la gestione documentale",
    clientType: "Startup B2B",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    results: [
      { icon: Clock, label: "Time to market", value: "6 settimane" },
      { icon: TrendingUp, label: "Beta signups", value: "500+" },
      { icon: Zap, label: "Retention", value: "78%" },
    ],
    thumbnail: "/placeholder.svg",
    featured: true,
  },
  {
    id: "3",
    slug: "design-system",
    title: "Design System Implementation",
    subtitle: "Creazione di un design system scalabile per un'agenzia tech con 15+ sviluppatori",
    clientType: "Tech Agency",
    stack: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
    results: [
      { icon: Zap, label: "Dev velocity", value: "+40%" },
      { icon: TrendingUp, label: "Consistenza UI", value: "100%" },
      { icon: Clock, label: "Onboarding devs", value: "-50%" },
    ],
    thumbnail: "/placeholder.svg",
    featured: false,
  },
];

export default function Progetti() {
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
              Progetti
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              Risultati, non promesse
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Una selezione di progetti che mostrano il mio approccio: focus sui risultati, attenzione ai dettagli, e tecnologie moderne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid gap-8">
            {caseStudies.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card overflow-hidden group"
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Thumbnail */}
                  <div className="lg:col-span-2 relative aspect-video lg:aspect-auto bg-surface overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-4xl font-bold text-primary/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-6 md:p-8 flex flex-col">
                    <div className="mb-auto">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 rounded bg-surface text-xs font-mono text-muted-foreground">
                          {project.clientType}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {project.subtitle}
                      </p>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.results.map((result) => (
                          <div key={result.label} className="text-center p-3 rounded-lg bg-surface/50">
                            <result.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="font-display font-bold text-lg">{result.value}</p>
                            <p className="text-xs text-muted-foreground">{result.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[hsl(var(--border))]">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-surface text-xs font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
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
              Hai un progetto simile?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Raccontami la tua sfida. Vediamo insieme come posso aiutarti a raggiungere risultati concreti.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Parliamo del tuo progetto
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
