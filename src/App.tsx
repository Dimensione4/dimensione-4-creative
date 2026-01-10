import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Servizi from "./pages/Servizi";
import MVP from "./pages/MVP";
import Progetti from "./pages/Progetti";
import Metodo from "./pages/Metodo";
import Abbonamento from "./pages/Abbonamento";
import ChiSono from "./pages/ChiSono";
import Contatti from "./pages/Contatti";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/mvp" element={<MVP />} />
                <Route path="/progetti" element={<Progetti />} />
                <Route path="/metodo" element={<Metodo />} />
                <Route path="/abbonamento" element={<Abbonamento />} />
                <Route path="/chi-sono" element={<ChiSono />} />
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
