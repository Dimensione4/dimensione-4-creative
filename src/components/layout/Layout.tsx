import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { CookieConsent } from "@/components/CookieConsent";
import { SnapRail } from "./SnapRail";
import { useSectionSnapScroll } from "@/hooks/useSectionSnapScroll";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  const location = useLocation();
  const [snapSectionIds, setSnapSectionIds] = useState<string[]>([]);

  useSectionSnapScroll(snapSectionIds, {
    enabled: snapSectionIds.length > 1,
  });

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

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      const pathKey = location.pathname
        .replace(/\//g, "-")
        .replace(/^-+|-+$/g, "") || "home";

      const sectionIds = Array.from(
        document.querySelectorAll("main > section")
      ).map((section, index) => {
        const node = section as HTMLElement;
        if (!node.id) {
          node.id = `snap-${pathKey}-${index + 1}`;
        }
        return node.id;
      });

      if (showFooter) {
        const footer = document.getElementById("site-footer");
        if (footer?.id) {
          sectionIds.push(footer.id);
        }
      }

      setSnapSectionIds(sectionIds);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [location.pathname, showFooter, children]);

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
