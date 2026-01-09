import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <SEO 
        title="404 - Pagina non trovata"
        description="La pagina che stai cercando non esiste o è stata spostata."
        noindex
      />
      <div className="absolute inset-0 pattern-dots" />
      
      <div className="relative text-center px-6">
        <span className="font-display text-[8rem] md:text-[12rem] font-bold text-gradient leading-none block mb-8">
          404
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Pagina non trovata
        </h1>
        <p className="text-body-lg text-muted-foreground mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/">
            <Home className="w-4 h-4" />
            Torna alla home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
