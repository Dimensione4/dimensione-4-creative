import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { localizedRoutes } from "@/lib/routes/routes";

const NotFound = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const routes = localizedRoutes[isItalian ? "it" : "en"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <SEO
        title={isItalian ? "404 - Pagina non trovata" : "404 - Page not found"}
        description={
          isItalian
            ? "La pagina che stai cercando non esiste o è stata spostata."
            : "The page you are looking for does not exist or has been moved."
        }
        noindex
      />
      <div className="absolute inset-0 pattern-dots" />

      <div className="relative text-center px-6">
        <span className="font-display text-[8rem] md:text-[12rem] font-bold text-gradient leading-none block mb-8">
          404
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
          {isItalian ? "Pagina non trovata" : "Page not found"}
        </h1>
        <p className="text-body-lg text-muted-foreground mb-8 max-w-md mx-auto">
          {isItalian
            ? "La pagina che stai cercando non esiste o è stata spostata."
            : "The page you are looking for does not exist or has been moved."}
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to={routes.home}>
            <Home className="w-4 h-4" />
            {isItalian ? "Torna alla home" : "Back to home"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
