import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Clock, Zap, ExternalLink, Sparkles, Factory } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { localizedRoutes } from "@/lib/routes/routes";

import meccanicaMockup from "@/assets/industrial-meccanica-mockup.jpg";
import steelMockup from "@/assets/industrial-steel-mockup.jpg";
import automazioneMockup from "@/assets/industrial-automazione-mockup.jpg";
import fonderiaMockup from "@/assets/industrial-fonderia-mockup.jpg";

export default function Progetti() {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];

  const caseStudies = [
    {
      id: "1",
      title: "E-commerce Performance Boost",
      subtitle: isItalian
        ? "Ottimizzazione Core Web Vitals per un negozio WooCommerce con 10k+ prodotti"
        : "Core Web Vitals optimization for a WooCommerce store with 10k+ products",
      clientType: isItalian ? "E-commerce" : "E-commerce",
      stack: ["WordPress", "WooCommerce", "PHP", "Performance Audit"],
      results: [
        { icon: Zap, label: "Load time", value: "3s -> 1.2s" },
        { icon: TrendingUp, label: "Core Web Vitals", value: "All Green" },
        { icon: Clock, label: isItalian ? "Durata progetto" : "Project length", value: isItalian ? "3 settimane" : "3 weeks" },
      ],
      featured: true,
    },
    {
      id: "2",
      title: "SaaS MVP Launch",
      subtitle: isItalian
        ? "Dalla validazione al lancio di una piattaforma B2B per la gestione documentale"
        : "From validation to launch for a B2B document management platform",
      clientType: isItalian ? "Startup B2B" : "B2B Startup",
      stack: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
      results: [
        { icon: Clock, label: "Time to market", value: isItalian ? "6 settimane" : "6 weeks" },
        { icon: TrendingUp, label: "Beta signups", value: "500+" },
        { icon: Zap, label: "Retention", value: "78%" },
      ],
      featured: true,
    },
  ];

  const creativeExperiences = [
    {
      id: "ce-1",
      title: "3D Web Design Experience",
      description: isItalian
        ? "Esplorazione di design 3D immersivo con navigazione spaziale e interazioni profonde."
        : "Immersive 3D design exploration with spatial navigation and deep interactions.",
      url: "https://cute-a5aysg13ic.peachworlds.com/",
      tags: ["3D", "WebGL", "Immersive"],
      gradient: "from-violet-500/20 via-fuchsia-500/20 to-pink-500/20",
    },
    {
      id: "ce-2",
      title: "Motion & Interaction Lab",
      description: isItalian
        ? "Esperimenti con animazioni avanzate, micro-interazioni e transizioni fluide."
        : "Experiments with advanced animation, micro-interactions, and fluid transitions.",
      url: "https://lusion.co/",
      tags: ["Motion", "Creative", "WebGL"],
      gradient: "from-cyan-500/20 via-teal-500/20 to-emerald-500/20",
    },
  ];

  const industrialProjects = [
    {
      id: "ind-1",
      title: "Meccanica di Precisione Srl",
      description: isItalian
        ? "Sito corporate per azienda specializzata in lavorazioni CNC di alta precisione."
        : "Corporate site for a company specialized in high-precision CNC machining.",
      sector: isItalian ? "Automotive" : "Automotive",
      features: isItalian ? ["Catalogo Prodotti", "Richiesta Preventivo", "Area Riservata"] : ["Product Catalog", "Quote Request", "Private Area"],
      mockup: meccanicaMockup,
    },
    {
      id: "ind-2",
      title: "Bergamo Steel Works",
      description: isItalian
        ? "Piattaforma B2B per la gestione ordini e tracciamento spedizioni."
        : "B2B platform for order management and shipment tracking.",
      sector: isItalian ? "Siderurgia" : "Steel",
      features: isItalian ? ["Ordini Online", "Tracking", "Dashboard Cliente"] : ["Online Orders", "Tracking", "Client Dashboard"],
      mockup: steelMockup,
    },
    {
      id: "ind-3",
      title: "Automazioni Industriali Orobiche",
      description: isItalian
        ? "Sito vetrina con configuratore prodotti per sistemi di automazione industriale."
        : "Showcase website with product configurator for industrial automation systems.",
      sector: isItalian ? "Automazione" : "Automation",
      features: isItalian ? ["Configuratore 3D", "Schede Tecniche", "Assistenza Remota"] : ["3D Configurator", "Technical Sheets", "Remote Support"],
      mockup: automazioneMockup,
    },
    {
      id: "ind-4",
      title: "Fonderia Valle Seriana",
      description: isItalian
        ? "Presenza digitale moderna per storica fonderia con focus su sostenibilità e innovazione."
        : "Modern digital presence for a historic foundry focused on sustainability and innovation.",
      sector: isItalian ? "Fonderia" : "Foundry",
      features: isItalian ? ["Storytelling", "Certificazioni", "Virtual Tour"] : ["Storytelling", "Certifications", "Virtual Tour"],
      mockup: fonderiaMockup,
    },
  ];

  return (
    <Layout>
      <SEO
        title={isItalian ? "Progetti" : "Projects"}
        description={
          isItalian
            ? "Case studies e risultati concreti: performance, MVP e sistemi scalabili."
            : "Case studies and concrete outcomes: performance, MVP, and scalable systems."
        }
        canonical={routes.projects}
      />

      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container-wide relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl" data-snap-anchor>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-[hsl(var(--border))] text-label text-muted-foreground font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
              {isItalian ? "Case studies reali" : "Real case studies"}
            </span>
            <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
              {isItalian ? "Progetti che trasformano idea in risultato." : "Projects that turn ideas into outcomes."}
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mb-8">
              {isItalian
                ? "Una selezione di lavori con obiettivi chiari, execution tecnica e metriche reali."
                : "A selection of work with clear goals, technical execution, and real metrics."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button variant="hero" size="lg" asChild>
                <Link to={routes.contacts}>
                  {isItalian ? "Avvia un progetto simile" : "Start a similar project"}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to={routes.services}>{isItalian ? "Vedi i servizi" : "View services"}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8">
            {caseStudies.map((project, index) => (
              <motion.article key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 * index }} className="surface-card overflow-hidden group" data-snap-anchor>
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-2 relative aspect-video lg:aspect-auto bg-surface overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-4xl font-bold text-primary/30">{project.title.charAt(0)}</span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-medium">Featured</span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-3 p-6 md:p-8 flex flex-col">
                    <div className="mb-auto">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 rounded bg-surface text-xs font-mono text-muted-foreground">{project.clientType}</span>
                      </div>
                      <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h2>
                      <p className="text-muted-foreground mb-6">{project.subtitle}</p>

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

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[hsl(var(--border))]">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-lg bg-surface text-xs font-mono text-muted-foreground">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-30" />
        <div className="container-wide relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12" data-snap-anchor>
            <span className="inline-flex items-center gap-2 font-mono text-label text-accent mb-4"><Sparkles className="w-4 h-4" />Creative Experiences</span>
            <h2 className="font-display text-h2 font-bold mb-4">{isItalian ? "Web come esperienza" : "Web as an experience"}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {creativeExperiences.map((experience, index) => (
              <motion.a key={experience.id} href={experience.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 * index }} className="group relative block surface-card overflow-hidden" data-snap-anchor>
                <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-primary/80">{tag}</span>
                      ))}
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">{experience.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{experience.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-surface/30">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="container-wide relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12" data-snap-anchor>
            <span className="inline-flex items-center gap-2 font-mono text-label text-primary mb-4"><Factory className="w-4 h-4" />Industrial & Manufacturing</span>
            <h2 className="font-display text-h2 font-bold mb-4">{isItalian ? "Soluzioni per l'industria" : "Solutions for industry"}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {industrialProjects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 * index }} className="group relative surface-card overflow-hidden" data-snap-anchor>
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.mockup} alt={`${project.title} mockup`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 left-4"><span className="px-3 py-1 rounded-lg bg-primary/90 text-primary-foreground text-xs font-mono font-medium backdrop-blur-sm">{project.sector}</span></div>
                </div>
                <div className="relative p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[hsl(var(--border))]">
                    {project.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-muted-foreground">{feature}</span>
                    ))}
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
            <h2 className="font-display text-h2 font-bold mb-4">{isItalian ? "Hai un progetto simile?" : "Do you have a similar project?"}</h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">{isItalian ? "Raccontami la tua sfida. Vediamo insieme come posso aiutarti." : "Tell me your challenge. Let's see how I can help."}</p>
            <Button variant="hero" size="xl" asChild>
              <Link to={routes.contacts}>
                {isItalian ? "Parliamo del tuo progetto" : "Let's discuss your project"}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
