import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useMaintenance } from "@/hooks/useMaintenance";
import { useHomepageVariant } from "@/hooks/useHomepageVariant";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { detectLangFromPath, localizedRoutes, type RouteKey } from "@/lib/routes/routes";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import Servizi from "./pages/Servizi";
import MVP from "./pages/MVP";
import Progetti from "./pages/Progetti";
import Metodo from "./pages/Metodo";
import Abbonamento from "./pages/Abbonamento";
import ChiSono from "./pages/ChiSono";
import Contatti from "./pages/Contatti";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsConditions from "./pages/TermsConditions";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component that checks maintenance mode
function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const { settings, loading: maintenanceLoading } = useMaintenance();
  const { isAdmin, loading: authLoading } = useAuth();
  const location = useLocation();

  // Allow access to maintenance page, admin routes, and login
  const isAllowedRoute =
    location.pathname === "/manutenzione" ||
    location.pathname.startsWith("/admin");

  // Show nothing while loading
  if (maintenanceLoading || authLoading) {
    return <>{children}</>;
  }

  // If maintenance is enabled and user is not admin and not on allowed routes
  if (settings.enabled && !isAdmin && !isAllowedRoute) {
    return <Navigate to="/manutenzione" replace />;
  }

  return <>{children}</>;
}

function HomePageRoute() {
  const { variant, loading } = useHomepageVariant();

  if (loading) {
    return <Index />;
  }

  return variant === "v2" ? <IndexV2 /> : <Index />;
}

function PageVisibilityGuard({
  routeKey,
  children,
}: {
  routeKey: RouteKey;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { isVisible, loading } = usePageVisibility();

  if (loading || isVisible(routeKey)) {
    return <>{children}</>;
  }

  const lang = detectLangFromPath(location.pathname);
  return <Navigate to={localizedRoutes[lang].home} replace />;
}

const AppRoutes = () => (
  <BrowserRouter>
    <GoogleAnalytics />
    <MaintenanceGuard>
      <Routes>
        <Route path="/" element={<HomePageRoute />} />
        <Route path="/en" element={<HomePageRoute />} />
        <Route path="/servizi" element={<PageVisibilityGuard routeKey="services"><Servizi /></PageVisibilityGuard>} />
        <Route path="/en/services" element={<PageVisibilityGuard routeKey="services"><Servizi /></PageVisibilityGuard>} />
        <Route path="/mvp" element={<PageVisibilityGuard routeKey="mvp"><MVP /></PageVisibilityGuard>} />
        <Route path="/en/mvp" element={<PageVisibilityGuard routeKey="mvp"><MVP /></PageVisibilityGuard>} />
        <Route path="/progetti" element={<PageVisibilityGuard routeKey="projects"><Progetti /></PageVisibilityGuard>} />
        <Route path="/en/projects" element={<PageVisibilityGuard routeKey="projects"><Progetti /></PageVisibilityGuard>} />
        <Route path="/metodo" element={<PageVisibilityGuard routeKey="method"><Metodo /></PageVisibilityGuard>} />
        <Route path="/en/method" element={<PageVisibilityGuard routeKey="method"><Metodo /></PageVisibilityGuard>} />
        <Route path="/abbonamento" element={<PageVisibilityGuard routeKey="subscription"><Abbonamento /></PageVisibilityGuard>} />
        <Route path="/en/subscription" element={<PageVisibilityGuard routeKey="subscription"><Abbonamento /></PageVisibilityGuard>} />
        <Route path="/chi-sono" element={<PageVisibilityGuard routeKey="about"><ChiSono /></PageVisibilityGuard>} />
        <Route path="/en/about" element={<PageVisibilityGuard routeKey="about"><ChiSono /></PageVisibilityGuard>} />
        <Route path="/contatti" element={<PageVisibilityGuard routeKey="contacts"><Contatti /></PageVisibilityGuard>} />
        <Route path="/en/contacts" element={<PageVisibilityGuard routeKey="contacts"><Contatti /></PageVisibilityGuard>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/en/cookie-policy" element={<CookiePolicy />} />
        <Route path="/termini-condizioni" element={<TermsConditions />} />
        <Route path="/en/terms-conditions" element={<TermsConditions />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/manutenzione" element={<Maintenance />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MaintenanceGuard>
  </BrowserRouter>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
