import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, Loader2, ArrowDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { SEO } from "@/components/SEO";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { trackEvent } from "@/components/GoogleAnalytics";

export default function Contatti() {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const { toast } = useToast();
  const { executeRecaptcha, isConfigured: recaptchaConfigured } =
    useRecaptcha();
  const { i18n } = useTranslation();
  const isItalian = i18n.language === "it";

  useEffect(() => {
    if (location.hash !== "#calendly") {
      return;
    }

    const scrollToCalendly = () => {
      const target = document.getElementById("calendly");
      if (!target) {
        return false;
      }

      const headerOffset = window.innerWidth >= 768 ? 96 : 84;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
      return true;
    };

    if (scrollToCalendly()) {
      return;
    }

    const timeoutId = window.setTimeout(scrollToCalendly, 180);
    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      website: (formData.get("website") as string) || "",
      message: formData.get("message") as string,
      privacyConsent: privacyConsent,
    };

    // Validate with zod
    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA if configured
      let recaptchaToken: string | null = null;
      if (recaptchaConfigured) {
        recaptchaToken = await executeRecaptcha("contact_form");
        if (!recaptchaToken) {
          throw new Error("reCAPTCHA verification failed");
        }
      }

      // Insert into database
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        website: result.data.website || null,
        message: result.data.message,
      });

      if (error) {
        throw error;
      }

      // Send email notifications (non-blocking)
      supabase.functions
        .invoke("send-contact-notification", {
          body: {
            name: result.data.name,
            email: result.data.email,
            message: result.data.message,
            website: result.data.website,
            recaptchaToken,
          },
        })
        .catch((err) => {
          console.error("Email notification error:", err);
        });

      // Track form conversion
      trackEvent("form_submission", {
        form_name: "contact_form",
        form_type: "lead_generation",
        has_website: !!result.data.website,
      });

      // Track as conversion event for Google Analytics
      trackEvent("generate_lead", {
        currency: "EUR",
        value: 0,
      });

      toast({
        title: isItalian ? "Messaggio inviato!" : "Message sent!",
        description: isItalian
          ? "Ti risponderò entro 24 ore lavorative."
          : "I'll respond within 24 business hours.",
      });

      (e.target as HTMLFormElement).reset();
      setPrivacyConsent(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: isItalian ? "Errore nell'invio" : "Error sending",
        description: isItalian
          ? "Si è verificato un problema. Riprova o scrivi direttamente a dariomarcobellini@dimensione4.it"
          : "An error occurred. Please try again or email dariomarcobellini@dimensione4.it directly",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO
        title={isItalian ? "Contatti" : "Contact"}
        description={
          isItalian
            ? "Prenota una call di 30 minuti o invia un messaggio. Rispondo entro 24 ore lavorative."
            : "Book a 30-minute call or send a message. I respond within 24 business hours."
        }
        canonical="/contatti"
      />
      {/* Hero */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-label text-primary mb-4 block">
                {isItalian ? "Contatti" : "Contact"}
              </span>
              <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
                {isItalian ? "Richiedi disponibilità" : "Request availability"}
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                {isItalian
                  ? "Una call chiara di 30 minuti per capire se posso aiutarti. Niente pressioni, niente attesa inutile."
                  : "A clear 30-minute call to understand if I can help you. No pressure, no unnecessary waiting."}
              </p>

              <div className="space-y-6">
                <div className="surface-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">
                        {isItalian ? "Scrivi via email" : "Write via email"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {isItalian
                          ? "Per richieste dettagliate o progetti specifici."
                          : "For detailed requests or specific projects."}
                      </p>
                      <a
                        href="mailto:dariomarcobellini@dimensione4.it"
                        className="text-sm text-primary hover:underline"
                      >
                        dariomarcobellini@dimensione4.it
                      </a>
                    </div>
                  </div>
                </div>

                <div className="surface-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">
                        {isItalian ? "Tempi di risposta" : "Response times"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isItalian
                          ? "Rispondo entro 24 ore lavorative. Niente spam, niente follow-up aggressivi."
                          : "I respond within 24 business hours. No spam, no aggressive follow-ups."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="relative inline-flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("calendly")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="inline-flex items-center gap-4 text-2xl font-medium text-primary hover:text-primary/80 transition-colors"
                    aria-label={
                      isItalian
                        ? "Vai alla sezione per prenotare una call"
                        : "Jump to the call booking section"
                    }
                  >
                    <motion.span
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.span>
                    {isItalian
                      ? "Prenota una call veloce con Calendly"
                      : "Book a quick call with Calendly"}
                  </button>
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-9 h-28 w-px bg-gradient-to-b from-primary/70 via-primary/30 to-transparent"
                    animate={{ y: [0, 18, 0], opacity: [0.9, 0.3, 0.9] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="surface-card p-8 md:p-10">
                <h2 className="font-display text-xl font-semibold mb-6">
                  {isItalian ? "Invia un messaggio" : "Send a message"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {isItalian ? "Nome *" : "Name *"}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={isItalian ? "Il tuo nome" : "Your name"}
                      className={`bg-surface-hover border-[hsl(var(--border))] ${
                        errors.name ? "border-destructive" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={isItalian ? "La tua e-mail" : "Your e-mail"}
                      className={`bg-surface-hover border-[hsl(var(--border))] ${
                        errors.email ? "border-destructive" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      {isItalian
                        ? "Sito web / Repository "
                        : "Website / Repository "}
                      <span className="text-muted-foreground">
                        ({isItalian ? "opzionale" : "optional"})
                      </span>
                    </label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://..."
                      className={`bg-surface-hover border-[hsl(var(--border))] ${
                        errors.website ? "border-destructive" : ""
                      }`}
                    />
                    {errors.website && (
                      <p className="text-xs text-destructive">
                        {errors.website}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {isItalian ? "Messaggio *" : "Message *"}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={
                        isItalian
                          ? "Descrivi brevemente il tuo progetto o la tua esigenza..."
                          : "Briefly describe your project or needs..."
                      }
                      className={`min-h-[150px] bg-surface-hover border-[hsl(var(--border))] resize-none ${
                        errors.message ? "border-destructive" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacyConsent"
                        checked={privacyConsent}
                        onCheckedChange={(checked) =>
                          setPrivacyConsent(checked === true)
                        }
                        className={
                          errors.privacyConsent ? "border-destructive" : ""
                        }
                      />
                      <label
                        htmlFor="privacyConsent"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        {isItalian ? (
                          <>
                            Ho letto e accetto l'{" "}
                            <Link
                              to="/privacy-policy"
                              className="text-primary hover:underline"
                              target="_blank"
                            >
                              informativa sulla privacy
                            </Link>{" "}
                            e acconsento al trattamento dei miei dati personali
                            *
                          </>
                        ) : (
                          <>
                            I have read and accept the{" "}
                            <Link
                              to="/privacy-policy"
                              className="text-primary hover:underline"
                              target="_blank"
                            >
                              privacy policy
                            </Link>{" "}
                            and consent to the processing of my personal data *
                          </>
                        )}
                      </label>
                    </div>
                    {errors.privacyConsent && (
                      <p className="text-xs text-destructive">
                        {errors.privacyConsent}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isItalian ? "Invio in corso..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        {isItalian ? "Invia messaggio" : "Send message"}
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {isItalian
                      ? "Questo sito è protetto da reCAPTCHA. Nessun dato viene condiviso con terzi."
                      : "This site is protected by reCAPTCHA. No data is shared with third parties."}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section id="calendly" className="section-padding pt-0">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CalendlyEmbed />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
