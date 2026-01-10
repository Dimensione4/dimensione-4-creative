import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, Suspense, lazy } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAvailability } from "@/hooks/useAvailability";
import heroImage from "@/assets/hero-4d.jpg";

const Hero3DScene = lazy(() => 
  import("./Hero3DScene").then(mod => ({ default: mod.Hero3DScene }))
);

export function HeroSection() {
  const ref = useRef(null);
  const { t } = useTranslation();
  const { availability } = useAvailability();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glow1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const isAvailable = availability.status === "available";

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Background image - temporarily commented out
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 pattern-dots" />
      </motion.div>

      {/* Geometric accent with breathing animation + parallax */}
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl geo-breathing-slow"
        style={{ y: glow1Y }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl geo-breathing"
        style={{ y: glow2Y }}
      />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      {/* Content */}
      <div className="container-tight relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-[hsl(var(--border))] text-label text-muted-foreground font-mono">
              <button
                onClick={() => {
                  document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative flex items-center justify-center h-4 w-4 cursor-pointer group"
                aria-label="View availability status"
              >
                {isAvailable && (
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success)/0.4)]"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                  isAvailable 
                    ? "bg-[hsl(var(--success))] shadow-[0_0_10px_hsl(var(--success)),0_0_20px_hsl(var(--success)/0.5)] group-hover:shadow-[0_0_15px_hsl(var(--success)),0_0_30px_hsl(var(--success)/0.6)]" 
                    : "bg-muted-foreground"
                }`} />
              </button>
              Creative Technology Studio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-hero-mobile md:text-hero font-bold mb-6"
          >
            {t('hero.title')}{" "}
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-muted-foreground mb-8 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" className="cta-glow" asChild>
              <Link to="/contatti">
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/servizi">
                <Play className="w-4 h-4" />
                {t('hero.ctaSecondary')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
