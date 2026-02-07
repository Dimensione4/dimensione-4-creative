import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { CookieConsent } from "@/components/CookieConsent";
import { SnapRail } from "./SnapRail";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.documentElement.classList.add("has-site-snap");
    document.body.classList.add("has-site-snap");

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
      document.documentElement.classList.remove("has-site-snap");
      document.body.classList.remove("has-site-snap");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative flex-1 pt-16 md:pt-20">
        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <SnapRail />
      <WhatsAppWidget phoneNumber="393334404903" message="Ciao! Vorrei maggiori informazioni sui tuoi servizi." />
      <CookieConsent />
    </div>
  );
}
