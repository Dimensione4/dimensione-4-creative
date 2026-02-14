export type SupportedLang = "it" | "en";

export type RouteKey =
  | "home"
  | "about"
  | "services"
  | "mvp"
  | "projects"
  | "method"
  | "subscription"
  | "contacts"
  | "privacy"
  | "cookies"
  | "terms";

export const localizedRoutes: Record<SupportedLang, Record<RouteKey, string>> = {
  it: {
    home: "/",
    about: "/chi-sono",
    services: "/servizi",
    mvp: "/mvp",
    projects: "/progetti",
    method: "/metodo",
    subscription: "/abbonamento",
    contacts: "/contatti",
    privacy: "/privacy-policy",
    cookies: "/cookie-policy",
    terms: "/termini-condizioni",
  },
  en: {
    home: "/en",
    about: "/en/about",
    services: "/en/services",
    mvp: "/en/mvp",
    projects: "/en/projects",
    method: "/en/method",
    subscription: "/en/subscription",
    contacts: "/en/contacts",
    privacy: "/en/privacy-policy",
    cookies: "/en/cookie-policy",
    terms: "/en/terms-conditions",
  },
};

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function detectLangFromPath(pathname: string): SupportedLang {
  const normalized = normalizePath(pathname);
  return normalized === "/en" || normalized.startsWith("/en/") ? "en" : "it";
}

export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  const normalized = normalizePath(pathname);
  const langs: SupportedLang[] = ["it", "en"];

  for (const lang of langs) {
    for (const [key, route] of Object.entries(localizedRoutes[lang])) {
      if (normalizePath(route) === normalized) {
        return key as RouteKey;
      }
    }
  }

  return null;
}

export function getLocalizedPath(
  pathname: string,
  targetLang: SupportedLang,
): string {
  const key = getRouteKeyFromPath(pathname);
  if (!key) {
    return targetLang === "en" ? "/en" : "/";
  }

  return localizedRoutes[targetLang][key];
}
