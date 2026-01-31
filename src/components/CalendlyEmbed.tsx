import { useEffect } from "react";
import { Calendar } from "lucide-react";

interface CalendlyEmbedProps {
  url?: string;
}

// Placeholder URL - replace with actual Calendly link
const CALENDLY_URL =
  "https://calendly.com/dimensione4-di-dariomarcobellini/30min";

export function CalendlyEmbed({ url = CALENDLY_URL }: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div id="booking" className="surface-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">
            Prenota una call di 30 minuti
          </h3>
          <p className="text-sm text-muted-foreground">
            Scegli il giorno e l'orario che preferisci
          </p>
        </div>
      </div>
      
      {/* Calendly inline widget */}
      <div
        className="calendly-inline-widget rounded-lg overflow-hidden"
        data-url={`${url}?hide_gdpr_banner=1&background_color=0a0d12&text_color=e0eaf7&primary_color=00a693`}
        style={{ minWidth: "320px", height: "700px" }}
      />
      
      {/* Fallback for when script doesn't load */}
      <noscript>
        <div className="aspect-video bg-surface rounded-lg flex flex-col items-center justify-center gap-4 p-8 text-center">
          <Calendar className="w-12 h-12 text-primary" />
          <p className="text-muted-foreground">
            Per prenotare una call, visita direttamente il calendario:
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-mono text-sm"
          >
            {url}
          </a>
        </div>
      </noscript>
    </div>
  );
}
