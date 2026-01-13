import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Palette, Lightbulb, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    category: "WordPress",
    items: [
      "Theme Development",
      "WooCommerce",
      "Performance",
      "SEO Tecnico",
      "Gutenberg",
    ],
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "Vercel", "Supabase", "VS Code", "Linear"],
  },
];

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
  return (
    <Layout>
      <SEO
        title="Chi sono"
        description="Dario Marco Bellini, developer senior specializzato in frontend, WordPress e ottimizzazione performance."
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
                Chi sono
              </span>
              <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
                Dario Marco Bellini
              </h1>
              <p className="text-body-lg text-muted-foreground mb-6">
                Dimensione 4 è la mia ditta individuale.{" "}
                <strong className="text-foreground">
                  Lavori con me, direttamente.
                </strong>
              </p>
              <p className="text-body text-muted-foreground mb-8">
                Un mix raro di precisione tecnica e sensibilità visiva. Ho
                passato anni a perfezionare entrambi gli aspetti, perché credo
                che il codice migliore sia quello che si sente nella user
                experience finale.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contatti">
                  Lavoriamo insieme
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Avatar placeholder - geometric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Geometric layers */}
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
            <h2 className="font-display text-h2 font-bold mb-4">Valori</h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Quello in cui credo e come mi guida nel lavoro.
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
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              Stack tecnologico
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl">
              Gli strumenti che uso quotidianamente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="surface-card p-8"
              >
                <h3 className="font-display text-lg font-semibold mb-4 text-primary">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-surface-hover text-sm font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="surface-card p-10 md:p-14 text-center"
          >
            <h2 className="font-display text-h2 font-bold mb-4">
              Hai un progetto in mente?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Contattami per un confronto diretto, senza impegno.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">
                Prenota una call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
