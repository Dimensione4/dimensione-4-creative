import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

export default function Contatti() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string || "",
      message: formData.get("message") as string,
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
      // Insert into database
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: result.data.name,
          email: result.data.email,
          website: result.data.website || null,
          message: result.data.message,
        });

      if (error) {
        throw error;
      }

      // Send email notifications (non-blocking)
      supabase.functions.invoke("send-contact-notification", {
        body: {
          name: result.data.name,
          email: result.data.email,
          message: result.data.message,
          website: result.data.website,
        },
      }).catch((err) => {
        console.error("Email notification error:", err);
      });

      toast({
        title: "Messaggio inviato!",
        description: "Ti risponderò entro 24 ore lavorative.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un problema. Riprova o scrivi direttamente a info@dimensione4.it",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-tight relative">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-label text-primary mb-4 block">
                Contatti
              </span>
              <h1 className="font-display text-hero-mobile md:text-[3.5rem] font-bold mb-6">
                Richiedi disponibilità
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                Una call chiara di 15 minuti per capire se posso aiutarti. Niente pressioni, niente attesa inutile.
              </p>

              <div className="space-y-6">
                <div className="surface-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">Scrivi via email</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Per richieste dettagliate o progetti specifici.
                      </p>
                      <a 
                        href="mailto:info@dimensione4.it"
                        className="text-sm text-primary hover:underline"
                      >
                        info@dimensione4.it
                      </a>
                    </div>
                  </div>
                </div>

                <div className="surface-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">Scrivi via email</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Per richieste dettagliate o progetti specifici.
                      </p>
                      <a 
                        href="mailto:info@dimensione4.it"
                        className="text-sm text-primary hover:underline"
                      >
                        info@dimensione4.it
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
                      <h3 className="font-display font-semibold mb-1">Tempi di risposta</h3>
                      <p className="text-sm text-muted-foreground">
                        Rispondo entro 24 ore lavorative. Niente spam, niente follow-up aggressivi.
                      </p>
                    </div>
                  </div>
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
                  Invia un messaggio
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Il tuo nome"
                      className={`bg-surface-hover border-[hsl(var(--border))] ${errors.name ? "border-destructive" : ""}`}
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
                      placeholder="la@tua.email"
                      className={`bg-surface-hover border-[hsl(var(--border))] ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Sito web / Repository <span className="text-muted-foreground">(opzionale)</span>
                    </label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://..."
                      className={`bg-surface-hover border-[hsl(var(--border))] ${errors.website ? "border-destructive" : ""}`}
                    />
                    {errors.website && (
                      <p className="text-xs text-destructive">{errors.website}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Messaggio *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descrivi brevemente il tuo progetto o la tua esigenza..."
                      className={`min-h-[150px] bg-surface-hover border-[hsl(var(--border))] resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
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
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        Invia messaggio
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Nessun dato viene condiviso con terzi. Ti contatterò solo per rispondere alla tua richiesta.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section className="section-padding pt-0">
        <div className="container-tight">
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
