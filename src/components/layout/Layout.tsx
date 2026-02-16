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
  enableSnap?: boolean;
}

export function Layout({
  children,
  showFooter = true,
  enableSnap = true,
}: LayoutProps) {
  const location = useLocation();
  const [snapSectionIds, setSnapSectionIds] = useState<string[]>([]);
  const [isDesktopSnap, setIsDesktopSnap] = useState(
    () => window.innerWidth >= 1024
  );

  useSectionSnapScroll(snapSectionIds, {
    enabled: enableSnap && isDesktopSnap && snapSectionIds.length > 1,
    mobileBreakpoint: 1024,
  });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktopSnap(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (enableSnap && isDesktopSnap) {
      document.documentElement.classList.add("has-site-snap");
      document.body.classList.add("has-site-snap");
      return () => {
        document.documentElement.classList.remove("has-site-snap");
        document.body.classList.remove("has-site-snap");
      };
    }

    document.documentElement.classList.remove("has-site-snap");
    document.body.classList.remove("has-site-snap");
    return () => {
      document.documentElement.classList.remove("has-site-snap");
      document.body.classList.remove("has-site-snap");
    };
  }, [isDesktopSnap, enableSnap]);

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
      {enableSnap ? <SnapRail /> : null}
      <WhatsAppWidget phoneNumber="393334404903" message="Ciao! Vorrei maggiori informazioni sui tuoi servizi." />
      <CookieConsent />
    </div>
  );
}
