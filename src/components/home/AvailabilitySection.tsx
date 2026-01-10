import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAvailability } from "@/hooks/useAvailability";

export function AvailabilitySection() {
  const { t } = useTranslation();
  const { availability, loading } = useAvailability();

  const isAvailable = availability.status === "available";

  return (
    <section id="availability" className="section-padding bg-surface/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: isAvailable 
            ? "radial-gradient(circle, hsl(var(--success) / 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(var(--muted-foreground) / 0.1) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container-tight relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Status indicator */}
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
                <span className="font-mono text-sm text-muted-foreground">Caricamento...</span>
              </div>
            ) : (
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background shadow-lg ${
                isAvailable 
                  ? "border border-[hsl(var(--success)/0.3)]" 
                  : "border border-[hsl(var(--border))]"
              }`}>
                <span className="relative flex items-center justify-center h-5 w-5">
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
                  <span className={`relative inline-flex rounded-full h-4 w-4 ${
                    isAvailable 
                      ? "bg-[hsl(var(--success))] shadow-[0_0_15px_hsl(var(--success)),0_0_25px_hsl(var(--success)/0.5)]" 
                      : "bg-muted-foreground"
                  }`} />
                </span>
                <span className={`font-mono text-sm font-semibold ${
                  isAvailable ? "text-[hsl(var(--success))]" : "text-muted-foreground"
                }`}>
                  {isAvailable ? t('availability.status') : t('availability.statusBusy')}
                </span>
              </div>
            )}
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-section-mobile md:text-section font-bold mb-4"
          >
            {isAvailable ? t('availability.title') : t('availability.titleBusy')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-muted-foreground mb-8"
          >
            {isAvailable ? t('availability.description') : t('availability.descriptionBusy')}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{t('availability.responseTime')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {availability.slots > 0 
                  ? `${availability.slots} ${t('availability.slotsLabel')}`
                  : t('availability.noSlots')
                }
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{t('availability.projects')}</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant={isAvailable ? "hero" : "outline"} 
              size="xl" 
              className={isAvailable ? "cta-glow" : ""} 
              asChild
            >
              <Link to="/contatti">
                <MessageCircle className="w-4 h-4" />
                {isAvailable ? t('availability.cta') : t('availability.ctaBusy')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
