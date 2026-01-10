import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type Language = "it" | "en";

interface LanguageSwitchProps {
  className?: string;
}

export function LanguageSwitch({ className = "" }: LanguageSwitchProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as Language;

  const toggleLanguage = () => {
    const newLang = language === "it" || language.startsWith("it") ? "en" : "it";
    i18n.changeLanguage(newLang);
  };

  const currentLang = language === "en" || language.startsWith("en") ? "en" : "it";

  return (
    <button
      onClick={toggleLanguage}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 backdrop-blur-xl border border-[hsl(var(--border))] hover:border-primary/30 transition-colors ${className}`}
      aria-label="Cambia lingua"
    >
      {/* Flag icons */}
      <div className="relative w-5 h-5 overflow-hidden rounded-full">
        <AnimatePresence mode="wait">
          {currentLang === "it" ? (
            <motion.div
              key="it"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Italian flag */}
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <rect x="0" y="4" width="8" height="16" fill="#009246" />
                <rect x="8" y="4" width="8" height="16" fill="#FFFFFF" />
                <rect x="16" y="4" width="8" height="16" fill="#CE2B37" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="en"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* UK flag simplified */}
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <rect x="0" y="4" width="24" height="16" fill="#012169" />
                <path d="M0 4 L24 20 M24 4 L0 20" stroke="#FFFFFF" strokeWidth="3" />
                <path d="M0 4 L24 20 M24 4 L0 20" stroke="#C8102E" strokeWidth="1.5" />
                <path d="M12 4 V20 M0 12 H24" stroke="#FFFFFF" strokeWidth="5" />
                <path d="M12 4 V20 M0 12 H24" stroke="#C8102E" strokeWidth="3" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language code */}
      <div className="relative overflow-hidden h-5 w-6">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentLang}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center text-xs font-mono font-medium uppercase text-foreground"
          >
            {currentLang}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Toggle indicator */}
      <motion.div
        className="w-1 h-1 rounded-full bg-primary"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
        key={currentLang}
      />
    </button>
  );
}
