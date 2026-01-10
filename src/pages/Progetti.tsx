import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Clock, Zap, ExternalLink, Sparkles, Factory } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

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

interface CreativeExperience {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  gradient: string;
}

interface IndustrialProject {
  id: string;
  title: string;
  description: string;
  url: string;
  sector: string;
  features: string[];
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

const creativeExperiences: CreativeExperience[] = [
  {
    id: "ce-1",
    title: "3D Web Design Experience",
    description: "Esplorazione di design 3D immersivo con navigazione spaziale e interazioni profonde.",
    url: "https://cute-a5aysg13ic.peachworlds.com/",
    tags: ["3D", "WebGL", "Immersive"],
    gradient: "from-violet-500/20 via-fuchsia-500/20 to-pink-500/20",
  },
  {
    id: "ce-2",
    title: "Motion & Interaction Lab",
    description: "Esperimenti con animazioni avanzate, micro-interazioni e transizioni fluide.",
    url: "https://lusion.co/",
    tags: ["Motion", "Creative", "WebGL"],
    gradient: "from-cyan-500/20 via-teal-500/20 to-emerald-500/20",
  },
  {
    id: "ce-3",
    title: "Digital Art Portfolio",
    description: "Portfolio artistico con esperienze visive uniche e storytelling digitale.",
    url: "https://www.aristidebenoist.com/",
    tags: ["Art", "Portfolio", "Experimental"],
    gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
  },
  {
    id: "ce-4",
    title: "Interactive Brand Experience",
    description: "Brand experience interattiva con animazioni cinematografiche e design immersivo.",
    url: "https://bruno-simon.com/",
    tags: ["Brand", "3D", "Interactive"],
    gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
  },
];

const industrialProjects: IndustrialProject[] = [
  {
    id: "ind-1",
    title: "Meccanica di Precisione Srl",
    description: "Sito corporate per azienda specializzata in lavorazioni CNC di alta precisione per il settore automotive.",
    url: "#",
    sector: "Automotive",
    features: ["Catalogo Prodotti", "Richiesta Preventivo", "Area Riservata"],
  },
  {
    id: "ind-2",
    title: "Bergamo Steel Works",
    description: "Piattaforma B2B per la gestione ordini e tracciamento spedizioni di componenti in acciaio.",
    url: "#",
    sector: "Siderurgia",
    features: ["Ordini Online", "Tracking", "Dashboard Cliente"],
  },
  {
    id: "ind-3",
    title: "Automazioni Industriali Orobiche",
    description: "Sito vetrina con configuratore prodotti per sistemi di automazione industriale.",
    url: "#",
    sector: "Automazione",
    features: ["Configuratore 3D", "Schede Tecniche", "Assistenza Remota"],
  },
  {
    id: "ind-4",
    title: "Fonderia Valle Seriana",
    description: "Presenza digitale moderna per storica fonderia con focus su sostenibilità e innovazione.",
    url: "#",
    sector: "Fonderia",
    features: ["Storytelling", "Certificazioni", "Virtual Tour"],
  },
];

export default function Progetti() {
  return (
    <Layout>
      <SEO 
        title="Progetti"
        description="Case studies e risultati concreti: performance, MVP e design system. Scopri i progetti realizzati."
        canonical="/progetti"
      />
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

      {/* Creative Experiences Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-30" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl geo-breathing" />
        
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-label text-accent mb-4">
              <Sparkles className="w-4 h-4" />
              Creative Experiences
            </span>
            <h2 className="font-display text-h2 font-bold mb-4">
              Web come esperienza
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Una raccolta di esperienze web creative che ridefiniscono i confini del design digitale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {creativeExperiences.map((experience, index) => (
              <motion.a
                key={experience.id}
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative block surface-card overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Animated Border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>

                <div className="relative p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-primary/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                    {experience.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {experience.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial & Manufacturing Section */}
      <section className="section-padding relative overflow-hidden bg-surface/30">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl geo-breathing-slow" />
        
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-label text-primary mb-4">
              <Factory className="w-4 h-4" />
              Industrial & Manufacturing
            </span>
            <h2 className="font-display text-h2 font-bold mb-4">
              Soluzioni per l'industria
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Siti web professionali per aziende manifatturiere e meccaniche della provincia di Bergamo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {industrialProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative surface-card overflow-hidden"
              >
                {/* Industrial Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                </div>

                <div className="relative p-6 md:p-8">
                  {/* Sector Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-mono font-medium border border-primary/20">
                      {project.sector}
                    </span>
                    <Factory className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-6">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[hsl(var(--border))]">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-md bg-surface text-xs font-mono text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
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
