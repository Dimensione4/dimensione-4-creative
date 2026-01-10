import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget phoneNumber="393334404903" message="Ciao! Vorrei maggiori informazioni sui tuoi servizi." />
    </div>
  );
}
