import { useLocation } from "react-router-dom";
import { localizedRoutes } from "@/lib/routes/routes";
import { useTranslation } from "react-i18next";

export function usePageKey(): string {
  const { i18n } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, ""); // rimuove trailing slash

  const lang = localizedRoutes[i18n.language] ? i18n.language : "it";
  const routes = localizedRoutes[lang];

  // Trova chiave logica in base al match del path
  const matchedEntry = Object.entries(routes).find(([_, path]) =>
    pathname.startsWith(path.replace(/\/+$/, ""))
  );

  // fallback logico per altre rotte
  if (matchedEntry) return matchedEntry[0];

  if (pathname.includes("mvp")) return "mvp";
  if (pathname.includes("progetti")) return "projects";
  if (pathname.includes("abbonamento")) return "subscription";

  return "general";
}