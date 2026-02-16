import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent } from "./CookieConsent";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount and when storage changes
  useEffect(() => {
    const checkConsent = () => {
      setHasConsent(hasAnalyticsConsent());
    };

    checkConsent();

    // Listen for storage changes (consent updates)
    window.addEventListener("storage", checkConsent);
    
    // Also listen for custom consent events
    const handleConsentChange = () => checkConsent();
    window.addEventListener("cookie-consent-updated", handleConsentChange);

    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener("cookie-consent-updated", handleConsentChange);
    };
  }, []);

  // Load GA script only if consent is given
  useEffect(() => {
    if (!hasConsent || !GA_MEASUREMENT_ID || isLoaded) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });

    // Load GA script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, [hasConsent, isLoaded]);

  useEffect(() => {
    if (import.meta.env.DEV && hasConsent && !GA_MEASUREMENT_ID) {
      // Keep this visible only in dev to avoid silent misconfiguration.
      // eslint-disable-next-line no-console
      console.warn(
        "[analytics] Missing VITE_GA_MEASUREMENT_ID. Pageviews are not being tracked.",
      );
    }
  }, [hasConsent]);

  // Track page views
  useEffect(() => {
    if (!isLoaded || !hasConsent || !GA_MEASUREMENT_ID) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location, isLoaded, hasConsent]);

  return null;
}

// Helper function to track events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (!hasAnalyticsConsent() || !window.gtag) return;
  
  window.gtag("event", eventName, eventParams);
}
