import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { FluidBackground } from "@/components/maintenance/FluidBackground";
import { CountdownTimer } from "@/components/maintenance/CountdownTimer";
import { useMaintenance } from "@/hooks/useMaintenance";
import logoSymbol from "@/assets/logo-symbol.png";

const WHATSAPP_NUMBER = "+393334404903";
const WHATSAPP_MESSAGE = "Ciao! Ho visitato il sito durante la manutenzione e volevo contattarti.";

export default function Maintenance() {
  const { settings, loading } = useMaintenance();

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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
        {/* Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <img
            src={logoSymbol}
            alt="Dimensione 4"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              DIMENSIONE 4
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              di Dario Marco Bellini
            </p>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-3 sm:mb-4 px-2"
        >
          {settings.title.split("Quarta Dimensione").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-primary">Quarta Dimensione</span>}
            </span>
          ))}
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

        {/* WhatsApp CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={handleWhatsAppClick}
          className="mt-8 sm:mt-10 flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Contattami su WhatsApp</span>
        </motion.button>

        {/* Interaction hint - visible on desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden md:block text-xs text-muted-foreground/60 mt-8 text-center"
        >
          Clicca e trascina per interagire con lo sfondo
        </motion.p>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-auto pt-8 sm:pt-12 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            Email:{" "}
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
