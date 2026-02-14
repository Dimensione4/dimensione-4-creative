import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAvailability } from "@/hooks/useAvailability";
import { localizedRoutes } from "@/lib/routes/routes";

export function AvailabilitySection() {
  const { t, i18n } = useTranslation();
  const { availability, loading } = useAvailability();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];

  const isAvailable = availability.status === "available";

  return (
    <section
      id="availability"
      className="section-padding bg-surface/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-grid opacity-30" />

      <div className="container-wide relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {loading ? (
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-[hsl(var(--border))] shadow-lg">
                <span className="w-4 h-4 rounded-full bg-muted-foreground/30 animate-pulse" />
                <span className="font-mono text-sm text-muted-foreground">
                  {isItalian ? "Caricamento..." : "Loading..."}
                </span>
              </div>
            ) : (
              <div
                className={`inline-flex items-center gap-3 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-background shadow-lg ${
                  isAvailable
                    ? "border border-[hsl(var(--success)/0.3)] shadow-[0_0_16px_hsl(var(--success)/0.14)]"
                    : "border border-[hsl(var(--border))]"
                }`}
              >
                <span className="relative flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5">
                  {isAvailable && (
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success)/0.35)]"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 ${
                      isAvailable
                        ? "bg-[hsl(var(--success))] shadow-[0_0_15px_hsl(var(--success)/0.8)]"
                        : "bg-muted-foreground"
                    }`}
                  />
                </span>
                <span
                  className={`font-mono text-[12px] sm:text-sm font-semibold whitespace-nowrap ${
                    isAvailable ? "text-[hsl(var(--success))]" : "text-muted-foreground"
                  }`}
                >
                  {isAvailable ? t("availability.status") : t("availability.statusBusy")}
                </span>
              </div>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-section-mobile md:text-section font-bold mb-4"
          >
            {isAvailable ? t("availability.title") : t("availability.titleBusy")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-muted-foreground mb-8"
          >
            {isAvailable ? t("availability.description") : t("availability.descriptionBusy")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{t("availability.responseTime")}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {availability.slots > 0 ? (
                <motion.span
                  animate={{
                    opacity: [1, 0.72, 1],
                    textShadow: [
                      "0 0 8px rgba(184,134,11,0.22)",
                      "0 0 14px rgba(184,134,11,0.45)",
                      "0 0 8px rgba(184,134,11,0.22)",
                    ],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="font-semibold text-[#c6942f]"
                >
                  {t("availability.slotsUrgency", { count: availability.slots })}
                </motion.span>
              ) : (
                <span>{t("availability.noSlots")}</span>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{t("availability.projects")}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant={isAvailable ? "hero" : "outline"}
              size="lg"
              className={`w-auto px-6 sm:px-8 ${isAvailable ? "shadow-[0_0_20px_hsl(var(--primary)/0.2)]" : ""}`}
              asChild
            >
              <Link to={routes.contacts}>
                <MessageCircle className="w-4 h-4" />
                {isAvailable ? t("availability.cta") : t("availability.ctaBusy")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
