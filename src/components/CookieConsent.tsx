import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_PREFERENCES_KEY = "cookie_preferences";

export function CookieConsent() {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === "it";
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to prevent flashing on page load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
    
    // Dispatch custom event for analytics to listen
    window.dispatchEvent(new CustomEvent("cookie-consent-updated"));
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  // Export function to reopen consent
  useEffect(() => {
    (window as any).openCookieConsent = () => {
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
      setShowBanner(true);
      setShowSettings(true);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-wide">
            <div className="surface-card p-6 md:p-8 border border-border shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display font-semibold text-lg">
                      {isItalian ? "Utilizziamo i cookie" : "We use cookies"}
                    </h3>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    {isItalian 
                      ? "Questo sito utilizza cookie tecnici necessari per il funzionamento. Puoi scegliere se accettare anche cookie analitici per aiutarci a migliorare il sito."
                      : "This site uses technical cookies necessary for operation. You can choose whether to also accept analytics cookies to help us improve the site."}
                    {" "}
                    <Link to="/cookie-policy" className="text-primary hover:underline">
                      {isItalian ? "Maggiori informazioni" : "Learn more"}
                    </Link>
                  </p>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 mb-6 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                {isItalian ? "Cookie Necessari" : "Necessary Cookies"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {isItalian 
                                  ? "Essenziali per il funzionamento del sito" 
                                  : "Essential for the website to function"}
                              </p>
                            </div>
                            <Switch checked={true} disabled />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                {isItalian ? "Cookie Analitici" : "Analytics Cookies"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {isItalian 
                                  ? "Ci aiutano a capire come viene utilizzato il sito" 
                                  : "Help us understand how the site is used"}
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.analytics}
                              onCheckedChange={(checked) => 
                                setPreferences(prev => ({ ...prev, analytics: checked }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                {isItalian ? "Cookie di Marketing" : "Marketing Cookies"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {isItalian 
                                  ? "Utilizzati per mostrare annunci pertinenti" 
                                  : "Used to show relevant ads"}
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.marketing}
                              onCheckedChange={(checked) => 
                                setPreferences(prev => ({ ...prev, marketing: checked }))
                              }
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {!showSettings ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSettings(true)}
                          className="gap-2"
                        >
                          <Settings2 className="w-4 h-4" />
                          {isItalian ? "Personalizza" : "Customize"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={acceptNecessary}
                        >
                          {isItalian ? "Solo necessari" : "Necessary only"}
                        </Button>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={acceptAll}
                        >
                          {isItalian ? "Accetta tutti" : "Accept all"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSettings(false)}
                        >
                          {isItalian ? "Indietro" : "Back"}
                        </Button>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={savePreferences}
                        >
                          {isItalian ? "Salva preferenze" : "Save preferences"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper to check if analytics is enabled
export function hasAnalyticsConsent(): boolean {
  const prefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!prefs) return false;
  const parsed = JSON.parse(prefs) as CookiePreferences;
  return parsed.analytics;
}

// Helper to check if marketing is enabled
export function hasMarketingConsent(): boolean {
  const prefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!prefs) return false;
  const parsed = JSON.parse(prefs) as CookiePreferences;
  return parsed.marketing;
}
