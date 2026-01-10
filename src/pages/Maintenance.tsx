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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 py-12 sm:py-16">
        {/* Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-10 sm:mb-12"
        >
          <img
            src={logoSymbol}
            alt="Dimensione 4"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              DIMENSIONE 4
            </h2>
            <p className="text-sm sm:text-base text-primary font-medium mt-1">
              Quarta Dimensione
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 tracking-wide">
              prospettiva · struttura · tempo
            </p>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-4 sm:mb-5 px-4"
        >
          {settings.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-sm sm:max-w-md md:max-w-lg mb-10 sm:mb-14 px-4"
        >
          {settings.subtitle}
        </motion.p>

        {/* Countdown */}
        {settings.show_countdown && settings.countdown_date && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg px-4 mb-10 sm:mb-12"
          >
            <CountdownTimer targetDate={settings.countdown_date} />
          </motion.div>
        )}

        {/* WhatsApp CTA with pulse effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <motion.button
            onClick={handleWhatsAppClick}
            className="relative flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contattami su WhatsApp</span>
          </motion.button>
          
          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#25D366]/30 pointer-events-none"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Interaction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xs text-muted-foreground/60 mt-10 sm:mt-12 text-center"
        >
          Clicca e trascina per interagire con lo sfondo
        </motion.p>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-auto pt-10 sm:pt-14 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            Email:{" "}
            <a
              href="mailto:dariomarcobellini@dimensione4.it"
              className="text-primary hover:underline"
            >
              dariomarcobellini@dimensione4.it
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
