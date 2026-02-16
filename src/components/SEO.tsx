import { Helmet } from "react-helmet-async";
import {
  detectLangFromPath,
  getRouteKeyFromPath,
  localizedRoutes,
} from "@/lib/routes/routes";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = "Dimensione 4";
const DEFAULT_DESCRIPTION =
  "Sviluppo siti web, MVP e ottimizzazione performance a Bergamo, Bariano e provincia di Bergamo. Dimensione 4 di Dario Marco Bellini.";
const DEFAULT_OG_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";
const SITE_URL = "https://dimensione4.it";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SEOProps) {
  const canonicalPath = canonical ?? "/";
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const currentLang = detectLangFromPath(canonicalPath);
  const routeKey = getRouteKeyFromPath(canonicalPath);
  const itPath = routeKey ? localizedRoutes.it[routeKey] : "/";
  const enPath = routeKey ? localizedRoutes.en[routeKey] : "/en";
  const locale = currentLang === "en" ? "en_US" : "it_IT";
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Studio Web e MVP a Bergamo`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Dimensione 4 di Dario Marco Bellini",
    alternateName: "Dimensione 4",
    url: SITE_URL,
    email: "mailto:dariomarcobellini@dimensione4.it",
    areaServed: [
      {
        "@type": "City",
        name: "Bariano",
      },
      {
        "@type": "City",
        name: "Bergamo",
      },
      {
        "@type": "AdministrativeArea",
        name: "Provincia di Bergamo",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bariano",
      addressRegion: "BG",
      addressCountry: "IT",
    },
    serviceType: [
      "Sviluppo siti web",
      "Sviluppo MVP",
      "Ottimizzazione performance web",
      "WordPress e WooCommerce",
      "Frontend engineering",
    ],
    sameAs: [
      "https://www.linkedin.com/in/dariobellini",
      "https://x.com/Dimensione4it",
      "https://www.instagram.com/dimensione4.it",
      "https://www.tiktok.com/@dimensione4.it",
      "https://github.com/Dimensione4",
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="it" href={`${SITE_URL}${itPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      <meta name="language" content={currentLang} />
      <meta name="geo.region" content="IT-BG" />
      <meta name="geo.placename" content="Bariano, Bergamo" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
}
