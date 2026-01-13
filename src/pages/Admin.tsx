import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  Loader2,
  Settings,
  CircleDot,
  Users,
  Wrench,
  Calendar,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { useAvailability } from "@/hooks/useAvailability";
import { useMaintenance } from "@/hooks/useMaintenance";
import { useToast } from "@/hooks/use-toast";
import { useBuildInfo } from "@/hooks/useBuildInfo";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const {
    availability,
    loading: availLoading,
    updateAvailability,
  } = useAvailability();
  const {
    settings: maintenanceSettings,
    loading: maintenanceLoading,
    updateSettings: updateMaintenance,
    env,
  } = useMaintenance();
  const { toast } = useToast();
  const buildInfo = useBuildInfo();
  const [maintenanceTitle, setMaintenanceTitle] = useState("");
  const [maintenanceSubtitle, setMaintenanceSubtitle] = useState("");
  const [countdownDate, setCountdownDate] = useState<Date | undefined>(
    undefined
  );

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        toast({
          title: "Accesso negato",
          description: "Non hai i permessi per accedere a questa pagina",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  // Sync maintenance settings to local state
  useEffect(() => {
    if (!maintenanceLoading && maintenanceSettings) {
      setMaintenanceTitle(maintenanceSettings.title);
      setMaintenanceSubtitle(maintenanceSettings.subtitle);
      if (maintenanceSettings.countdown_date) {
        setCountdownDate(new Date(maintenanceSettings.countdown_date));
      }
    }
  }, [maintenanceSettings, maintenanceLoading]);

  const handleStatusToggle = async (checked: boolean) => {
    const newStatus = checked ? "available" : "busy";
    const { error } = await updateAvailability({
      ...availability,
      status: newStatus,
    });

    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Stato aggiornato",
        description: `Ora sei ${
          newStatus === "available" ? "disponibile" : "occupato"
        }`,
      });
    }
  };

  const handleSlotsChange = async (slots: number) => {
    const { error } = await updateAvailability({
      ...availability,
      slots: Math.max(0, Math.min(10, slots)),
    });

    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare gli slot",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Maintenance handlers
  const handleMaintenanceToggle = async (checked: boolean) => {
    const { error } = await updateMaintenance({ enabled: checked });
    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare la modalità manutenzione",
        variant: "destructive",
      });
    } else {
      toast({
        title: checked ? "Manutenzione attivata" : "Manutenzione disattivata",
      });
    }
  };

  const handleMaintenanceTitleBlur = async () => {
    if (maintenanceTitle !== maintenanceSettings.title) {
      await updateMaintenance({ title: maintenanceTitle });
    }
  };

  const handleMaintenanceSubtitleBlur = async () => {
    if (maintenanceSubtitle !== maintenanceSettings.subtitle) {
      await updateMaintenance({ subtitle: maintenanceSubtitle });
    }
  };

  const handleCountdownToggle = async (checked: boolean) => {
    await updateMaintenance({ show_countdown: checked });
  };

  const handleCountdownDateChange = async (date: Date | undefined) => {
    setCountdownDate(date);
    await updateMaintenance({
      countdown_date: date ? date.toISOString() : null,
    });
  };

  if (authLoading || availLoading || maintenanceLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout>
      <SEO
        title="Admin Panel"
        description="Pannello di amministrazione"
        noindex
      />
      <section className="section-padding min-h-[70vh]">
        <div className="container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h1 className="font-display text-section-mobile md:text-section font-bold mb-2">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Gestisci le impostazioni del sito
              </p>

              <div className="mt-2 text-xs opacity-70 space-y-1">
                <div>
                  Environment: <b>{env}</b>
                </div>
                {buildInfo && (
                  <>
                    <div>
                      Build env: <b>{buildInfo.env}</b>
                    </div>
                    <div>
                      Branch: <b>{buildInfo.branch}</b>
                    </div>
                    <div>
                      Commit: <b>{buildInfo.commitShort}</b>
                    </div>
                    <div>
                      Build time:{" "}
                      <b>{new Date(buildInfo.buildTime).toLocaleString()}</b>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="surface-card p-6 rounded-2xl border border-[hsl(var(--border))]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CircleDot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Stato Disponibilità
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Mostra ai visitatori se sei disponibile
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Status Toggle */}
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-3">
                    <span
                      className={`relative flex h-3 w-3 ${
                        availability.status === "available" ? "" : ""
                      }`}
                    >
                      {availability.status === "available" && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success))] opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 ${
                          availability.status === "available"
                            ? "bg-[hsl(var(--success))] shadow-[0_0_10px_hsl(var(--success))]"
                            : "bg-muted-foreground"
                        }`}
                      />
                    </span>
                    <span className="font-medium">
                      {availability.status === "available"
                        ? "Disponibile"
                        : "Occupato"}
                    </span>
                  </div>
                  <Switch
                    checked={availability.status === "available"}
                    onCheckedChange={handleStatusToggle}
                  />
                </div>

                {/* Slots */}
                <div className="space-y-2">
                  <Label htmlFor="slots">Slot disponibili</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSlotsChange(availability.slots - 1)}
                      disabled={availability.slots <= 0}
                    >
                      -
                    </Button>
                    <Input
                      id="slots"
                      type="number"
                      value={availability.slots}
                      onChange={(e) =>
                        handleSlotsChange(parseInt(e.target.value) || 0)
                      }
                      className="w-20 text-center"
                      min={0}
                      max={10}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSlotsChange(availability.slots + 1)}
                      disabled={availability.slots >= 10}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Numero di progetti che puoi accettare
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Maintenance Mode Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="surface-card p-6 rounded-2xl border border-[hsl(var(--border))]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Modalità Manutenzione
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Mostra pagina manutenzione ai visitatori
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Enable Toggle */}
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-3">
                    <span className={`relative flex h-3 w-3`}>
                      {maintenanceSettings.enabled && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--warm))] opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 ${
                          maintenanceSettings.enabled
                            ? "bg-[hsl(var(--warm))] shadow-[0_0_10px_hsl(var(--warm))]"
                            : "bg-muted-foreground"
                        }`}
                      />
                    </span>
                    <span className="font-medium">
                      {maintenanceSettings.enabled ? "Attiva" : "Disattiva"}
                    </span>
                  </div>
                  <Switch
                    checked={maintenanceSettings.enabled}
                    onCheckedChange={handleMaintenanceToggle}
                  />
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="maintenance-title">Titolo</Label>
                  <Input
                    id="maintenance-title"
                    value={maintenanceTitle}
                    onChange={(e) => setMaintenanceTitle(e.target.value)}
                    onBlur={handleMaintenanceTitleBlur}
                    placeholder="Sito in manutenzione"
                  />
                </div>

                {/* Subtitle Input */}
                <div className="space-y-2">
                  <Label htmlFor="maintenance-subtitle">Sottotitolo</Label>
                  <Input
                    id="maintenance-subtitle"
                    value={maintenanceSubtitle}
                    onChange={(e) => setMaintenanceSubtitle(e.target.value)}
                    onBlur={handleMaintenanceSubtitleBlur}
                    placeholder="Torneremo presto con novità!"
                  />
                </div>

                {/* Countdown Toggle & Date */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="countdown-toggle">Mostra Countdown</Label>
                    <Switch
                      id="countdown-toggle"
                      checked={maintenanceSettings.show_countdown}
                      onCheckedChange={handleCountdownToggle}
                    />
                  </div>

                  {maintenanceSettings.show_countdown && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {countdownDate
                            ? format(countdownDate, "PPP", { locale: it })
                            : "Seleziona data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={countdownDate}
                          onSelect={handleCountdownDateChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>

                {/* Preview Link */}
                {maintenanceSettings.enabled && (
                  <a
                    href="/manutenzione"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-sm text-primary hover:underline mt-4"
                  >
                    Anteprima pagina manutenzione →
                  </a>
                )}
              </div>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="surface-card p-6 rounded-2xl border border-[hsl(var(--border))]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Info Account
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Dettagli del tuo account
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-[hsl(var(--border))]">
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-mono text-sm">{user.email}</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-[hsl(var(--border))]">
                  <p className="text-sm text-muted-foreground mb-1">Ruolo</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium">Amministratore</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
