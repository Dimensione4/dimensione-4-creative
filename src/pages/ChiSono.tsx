import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  PhoneCall,
  Linkedin,
  Code2,
  Palette,
  Lightbulb,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { localizedRoutes } from "@/lib/routes/routes";
import { trackEvent } from "@/utils/analytics";

type CoreTech = {
  name: string;
  icon: string;
  seniority: number;
  category: "Frontend" | "Backend" | "Database" | "CMS";
  iconUrl?: string;
};

type EcosystemTech = {
  name: string;
  icon: string;
  iconUrl?: string;
};

type AISkill = {
  name: string;
  seniority: number;
};

const coreStack: CoreTech[] = [
  { name: "React", icon: "react", seniority: 100, category: "Frontend" },
  { name: "Next.js", icon: "nextdotjs", seniority: 90, category: "Frontend" },
  {
    name: "TypeScript",
    icon: "typescript",
    seniority: 95,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwindcss",
    seniority: 93,
    category: "Frontend",
  },
  { name: "Three.js", icon: "threedotjs", seniority: 85, category: "Frontend" },
  {
    name: "Python",
    icon: "python",
    seniority: 98,
    category: "Backend",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "java",
    seniority: 70,
    category: "Backend",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Spring Boot",
    icon: "springboot",
    seniority: 70,
    category: "Backend",
  },
  { name: "WordPress", icon: "wordpress", seniority: 100, category: "CMS" },
  {
    name: "WooCommerce",
    icon: "woocommerce",
    seniority: 90,
    category: "CMS",
  },
  { name: "Docker", icon: "docker", seniority: 90, category: "Backend" },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    seniority: 98,
    category: "Database",
  },
  {
    name: "Supabase",
    icon: "supabase",
    seniority: 90,
    category: "Database",
  },
];

const ecosystemStack: EcosystemTech[] = [
  {
    name: "Angular",
    icon: "angular",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Render",
    icon: "render",
    iconUrl: "https://cdn.simpleicons.org/render/FFFFFF",
  },
  {
    name: "Neon",
    icon: "neon",
    iconUrl: "https://icons.duckduckgo.com/ip3/neon.tech.ico",
  },
  { name: "Flutter", icon: "flutter" },
  { name: "Kotlin", icon: "kotlin" },
  {
    name: "Azure",
    icon: "microsoftazure",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Lovable",
    icon: "lovable",
    iconUrl: "https://icons.duckduckgo.com/ip3/lovable.dev.ico",
  },
  {
    name: "Vercel",
    icon: "vercel",
    iconUrl: "https://cdn.simpleicons.org/vercel/FFFFFF",
  },
  { name: "GSAP", icon: "greensock" },
  {
    name: "Firebase",
    icon: "firebase",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  { name: "PHP", icon: "php" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
];

const aiSkills: AISkill[] = [
  { name: "Prompt Engineering", seniority: 92 },
  { name: "LLM Integration", seniority: 86 },
  { name: "AI Automation", seniority: 84 },
  { name: "AI Prototyping", seniority: 88 },
].sort((a, b) => b.seniority - a.seniority);

const values = [
  {
    icon: Lightbulb,
    title: "Chiarezza",
    description:
      "Comunicazione diretta, senza giri di parole. Sai sempre cosa sta succedendo.",
  },
  {
    icon: Zap,
    title: "Velocità",
    description: "Rispetto le deadline. Se qualcosa cambia, lo saprai subito.",
  },
  {
    icon: Code2,
    title: "Qualità",
    description:
      "Codice pulito, testato, documentato. Niente scorciatoie che creano debito tecnico.",
  },
  {
    icon: Palette,
    title: "Cura",
    description:
      "I dettagli contano. Ogni pixel, ogni transizione, ogni interazione.",
  },
];

export default function ChiSono() {
  const [photoError, setPhotoError] = useState(false);
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];
  const bookingLink = `${routes.contacts}#calendly`;

  const getIconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

  const coreCategoryOrder: Array<CoreTech["category"]> = [
    "Frontend",
    "Backend",
    "CMS",
    "Database",
  ];

  const sortedCoreByCategory = coreCategoryOrder.map((category) => ({
    category,
    items: coreStack
      .filter((tech) => tech.category === category)
      .sort((a, b) => b.seniority - a.seniority),
  }));

  return (
    <Layout>
      <SEO
        title={isItalian ? "Chi sono" : "About"}
        description={
          isItalian
            ? "Dario Marco Bellini, creative developer: sviluppo prodotti digitali orientati a performance, chiarezza e crescita."
            : "Dario Marco Bellini, creative developer building digital products focused on performance, clarity, and growth."
        }
        canonical="/chi-sono"
      />
      {/* Hero */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-label text-primary mb-4 block">
                {isItalian ? "Chi sono" : "About"}
              </span>
              <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
                <span className="inline-block px-2 -mx-2 rounded-md border border-transparent transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_22px_hsl(var(--primary)/0.28)]">
                  Dario Marco Bellini
                </span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-6">
                {isItalian
                  ? "Sono il founder di Dimensione 4, il mio spazio creativo e tecnico. "
                  : "I am the founder of Dimensione 4, my creative and technical world. "}
                <strong className="text-foreground">
                  {isItalian
                    ? "Lavori con me, direttamente."
                    : "You work directly with me."}
                </strong>
              </p>
              <p className="text-body text-muted-foreground mb-8">
                {isItalian
                  ? "Unisco strategia, design e sviluppo in un unico flusso. Meno complessita, più decisioni chiare e prodotti che funzionano nel tempo."
                  : "I combine strategy, design, and development in one flow. Less complexity, clearer decisions, and products that keep working over time."}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button variant="hero" size="lg" className="h-14 px-8" asChild>
                  <Link
                    to={routes.contacts}
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_text: isItalian
                          ? "Lavoriamo insieme"
                          : "Let's work together",
                        cta_section: "about_hero",
                      })
                    }
                  >
                    {isItalian ? "Lavoriamo insieme" : "Let's work together"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <a
                  href="https://linkedin.com/in/dariobellini"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_text: isItalian
                        ? "Segui i miei aggiornamenti"
                        : "Follow my updates",
                      cta_section: "about_hero",
                    })
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-14 items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-surface/70 px-4 hover:border-primary/50 hover:bg-surface transition-colors"
                >
                  <span className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-tight">
                    {isItalian
                      ? "Segui i miei aggiornamenti"
                      : "If you want to know me better or follow my work"}
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Avatar placeholder - geometric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {!photoError ? (
                <div className="max-w-md md:max-w-2xl mx-auto relative group">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 rotate-3" />
                  <div className="relative rounded-3xl border border-[hsl(var(--border))] bg-surface/70 p-2 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_18px_48px_hsl(var(--primary)/0.22)]">
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_18%_20%,hsl(var(--primary)/0.25),transparent_45%)]" />
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="/about/dario-portrait-9x16.webp"
                        type="image/webp"
                        sizes="(max-width: 767px) 88vw, 420px"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet="/about/dario-portrait-16x9.webp"
                        type="image/webp"
                        sizes="(max-width: 1279px) 52vw, 760px"
                      />
                      <source
                        media="(max-width: 767px)"
                        srcSet="/about/dario-portrait-9x16-original.png"
                        sizes="(max-width: 767px) 88vw, 420px"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet="/about/dario-portrait-16x9-original.png"
                        sizes="(max-width: 1279px) 52vw, 760px"
                      />
                      <img
                        src="/about/dario-portrait-16x9.webp"
                        srcSet="/about/dario-portrait-16x9.webp"
                        sizes="(max-width: 767px) 88vw, (max-width: 1279px) 52vw, 760px"
                        alt="Ritratto di Dario Marco Bellini"
                        className="w-full h-auto rounded-2xl object-cover aspect-[9/16] md:aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.025] group-hover:rotate-[0.35deg]"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        width={1536}
                        height={1024}
                        onError={() => setPhotoError(true)}
                      />
                    </picture>
                  </div>
                </div>
              ) : (
                <div className="aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 rotate-6" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-surface to-surface-hover -rotate-3" />
                  <div className="absolute inset-4 rounded-2xl bg-surface border border-[hsl(var(--border))] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow mx-auto mb-4 flex items-center justify-center">
                        <span className="font-display text-4xl font-bold text-primary-foreground">
                          D
                        </span>
                      </div>
                      <p className="font-mono text-sm text-muted-foreground">
                        Creative Engineer
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              {isItalian ? "Valori" : "Values"}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              {isItalian
                ? "Quello in cui credo e come mi guida nel lavoro."
                : "What I believe in and how it guides my work."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
            data-snap-anchor
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              {isItalian ? "Stack tecnologico" : "Technology stack"}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl">
              {isItalian
                ? "Gli strumenti che uso quotidianamente."
                : "The tools I use every day."}
            </p>
          </motion.div>

          <div
            className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:items-stretch"
            data-snap-anchor
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="surface-card p-6 md:p-8 h-full"
            >
              <h3 className="font-display text-lg md:text-xl font-semibold mb-2 text-primary">
                Core stack
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {isItalian
                  ? "Suddiviso per area e ordinato per seniority."
                  : "Grouped by area and ordered by seniority."}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {sortedCoreByCategory.map(
                  ({ category, items }, sectionIndex) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: sectionIndex * 0.06,
                      }}
                      className="rounded-2xl border border-[hsl(var(--border))] bg-surface-hover/30 p-4 md:p-5"
                    >
                      <h4 className="font-mono text-xs tracking-widest uppercase text-primary/90 mb-3">
                        {category}
                      </h4>
                      <div className="space-y-4">
                        {items.map((tech, index) => (
                          <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: 0.03 * index + sectionIndex * 0.05,
                            }}
                            className="space-y-2 group"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="w-9 h-9 rounded-full bg-white border border-white/30 flex items-center justify-center shrink-0 relative overflow-hidden">
                                  <img
                                    src={tech.iconUrl ?? getIconUrl(tech.icon)}
                                    alt={`${tech.name} logo`}
                                    className="w-5 h-5 object-contain absolute"
                                    loading="lazy"
                                    onError={(event) => {
                                      event.currentTarget.style.display =
                                        "none";
                                    }}
                                  />
                                </span>
                                <span className="text-sm md:text-base font-medium truncate">
                                  {tech.name}
                                </span>
                              </div>
                              <span className="font-mono text-xs md:text-sm text-primary">
                                {tech.seniority}%
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-surface-hover border border-[hsl(var(--border))] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${tech.seniority}%` }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.04 * index + sectionIndex * 0.07,
                                }}
                                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary group-hover:brightness-110 group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.45)]"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            <div className="space-y-3 h-full flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="surface-card p-6 md:p-8"
              >
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2 text-primary">
                  {isItalian ? "Ecosistema" : "Ecosystem"}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {isItalian
                    ? "Stack complementare usato in base al tipo di progetto."
                    : "Complementary stack used based on project type."}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ecosystemStack.map((tech, index) => (
                    <motion.div
                      key={`${tech.name}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.02 * index }}
                      className="rounded-xl border border-[hsl(var(--border))] bg-surface-hover/50 px-3 py-2 flex items-center gap-2 md:hover:border-primary/60 md:hover:bg-surface-hover/80 md:hover:-translate-y-0.5 md:hover:shadow-[0_10px_24px_hsl(var(--primary)/0.18)] transition-all duration-200"
                    >
                      <span className="w-7 h-7 rounded-full bg-surface/90 border border-[hsl(var(--border))] flex items-center justify-center shrink-0 relative overflow-hidden">
                        <img
                          src={tech.iconUrl ?? getIconUrl(tech.icon)}
                          alt={`${tech.name} logo`}
                          className="w-4 h-4 object-contain absolute"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </span>
                      <span className="text-xs md:text-sm font-medium leading-tight">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="surface-card p-5 md:p-6 flex-1"
              >
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2 text-primary">
                  AI
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isItalian
                    ? "Competenze applicate su workflow, prototipi e integrazioni."
                    : "Skills applied to workflows, prototyping, and integrations."}
                </p>
                <div className="space-y-2.5">
                  {aiSkills.map((skill, index) => (
                    <div key={skill.name} className="space-y-1 group">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs md:text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-primary">
                          {skill.seniority}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-hover border border-[hsl(var(--border))] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.seniority}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.7, delay: 0.05 * index }}
                          className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary group-hover:brightness-110"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" data-snap-label="CTA">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="surface-card p-10 md:p-14 text-center"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              {isItalian
                ? "Hai un progetto in mente?"
                : "Do you have a project in mind?"}
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              {isItalian
                ? "Contattami per un confronto diretto, senza impegno."
                : "Contact me for a direct chat, with no commitment."}
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
