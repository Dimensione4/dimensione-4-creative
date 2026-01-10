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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 safe-area-inset">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <img
            src={logoSymbol}
            alt="Dimensione 4"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-3 sm:mb-4 px-2"
        >
          {settings.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-xs sm:max-w-md mb-8 sm:mb-12 px-2"
        >
          {settings.subtitle}
        </motion.p>

        {/* Countdown */}
        {settings.show_countdown && settings.countdown_date && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg px-2"
          >
            <CountdownTimer targetDate={settings.countdown_date} />
          </motion.div>
        )}

        {/* Interaction hint - visible on desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden md:block text-xs text-muted-foreground/60 mt-8 text-center"
        >
          Trascina il mouse per interagire con lo sfondo
        </motion.p>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-auto pt-8 sm:pt-16 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            Per urgenze:{" "}
            <a
              href="mailto:dariomarcobellini@dimensione4.it"
              className="text-primary hover:underline break-all"
            >
              dariomarcobellini@dimensione4.it
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
