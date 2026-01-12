import { motion } from "framer-motion";
import { MessageCircle, Linkedin, Instagram } from "lucide-react";
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
      <div className="relative z-10 h-screen h-[100dvh] flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-8 md:py-12 safe-area-inset select-none overflow-hidden">
        {/* Top section: Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shrink-0"
        >
          <img
            src={logoSymbol}
            alt="Dimensione 4"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary">
              DIMENSIONE 4
            </h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              di Dario Marco Bellini — <span className="text-primary/80 font-medium">Fullstack Developer</span>
            </p>
          </div>
        </motion.div>

        {/* Middle section: Title, Subtitle, Countdown, CTA */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-2 sm:mb-3 px-2"
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
            className="text-xs sm:text-sm md:text-base text-muted-foreground text-center mt-2 sm:mt-4 mb-4 sm:mb-6 px-2"
          >
            {settings.subtitle
              .replace(/Torno online a breve\.?/gi, '')
              .trim()
              .replace(/prospettiva/gi, '{{CYAN}}prospettiva{{/CYAN}}')
              .replace(/struttura/gi, '{{CYAN}}struttura{{/CYAN}}')
              .replace(/tempo/gi, '{{CYAN}}tempo{{/CYAN}}')
              .split(/(\{\{CYAN\}\}.*?\{\{\/CYAN\}\})/g)
              .map((part, i) => {
                if (part.startsWith('{{CYAN}}')) {
                  return <span key={i} className="text-primary">{part.replace(/\{\{CYAN\}\}|\{\{\/CYAN\}\}/g, '')}</span>;
                }
                return part;
              })}
          </motion.p>

          {/* Countdown */}
          {settings.show_countdown && settings.countdown_date && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md px-2 mb-4 sm:mb-6"
            >
              <CountdownTimer targetDate={settings.countdown_date} />
            </motion.div>
          )}

          {/* WhatsApp CTA */}
          <div className="relative">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={handleWhatsAppClick}
              className="relative z-10 flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-medium rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Contattami su WhatsApp</span>
            </motion.button>
            {/* Pulse ring */}
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
          </div>

          {/* Interaction hint - visible on desktop */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden md:block text-xs text-muted-foreground/60 mt-4 text-center"
          >
            Clicca e trascina per interagire con lo sfondo
          </motion.p>
        </div>

        {/* Bottom section: Contact info - always visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="shrink-0 text-center"
        >
          <p className="text-[10px] sm:text-xs mb-1.5">
            <span className="text-amber-400">Torno online a breve</span>
            <span className="text-muted-foreground hidden sm:inline">, se hai bisogno di un fullstack developer contattami</span>
          </p>
          <a
            href="mailto:dariomarcobellini@dimensione4.it"
            className="text-[10px] sm:text-xs text-primary hover:underline"
          >
            dariomarcobellini@dimensione4.it
          </a>
          <div className="flex items-center justify-center gap-3 mt-2">
            <a
              href="https://www.linkedin.com/in/dariobellini"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.instagram.com/dimensione4.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
