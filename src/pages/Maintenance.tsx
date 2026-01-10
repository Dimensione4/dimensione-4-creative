import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { FluidBackground } from "@/components/maintenance/FluidBackground";
import { CountdownTimer } from "@/components/maintenance/CountdownTimer";
import { useMaintenance } from "@/hooks/useMaintenance";
import logoSymbol from "@/assets/logo-symbol.png";

export default function Maintenance() {
  const { settings, loading } = useMaintenance();

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={settings.title}
        description={settings.subtitle}
        noindex
      />
      
      {/* Fluid Background */}
      <FluidBackground className="z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={logoSymbol}
            alt="Dimensione 4"
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center text-[hsl(var(--foreground))] mb-4"
        >
          {settings.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] text-center max-w-md mb-12"
        >
          {settings.subtitle}
        </motion.p>

        {/* Countdown */}
        {settings.show_countdown && settings.countdown_date && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CountdownTimer targetDate={settings.countdown_date} />
          </motion.div>
        )}

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Per urgenze:{" "}
            <a
              href="mailto:dariomarcobellini@dimensione4.it"
              className="text-[hsl(var(--primary))] hover:underline"
            >
              dariomarcobellini@dimensione4.it
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
