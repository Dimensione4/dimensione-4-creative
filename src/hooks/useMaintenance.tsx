import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MaintenanceSettings {
  enabled: boolean;
  title: string;
  subtitle: string;
  show_countdown: boolean;
  countdown_date: string | null;
}

const DEFAULT_SETTINGS: MaintenanceSettings = {
  enabled: false,
  title: "Sto riallineando la Quarta Dimensione.",
  subtitle:
    "Un intervento tra prospettiva, struttura e tempo. Torno online a breve.",
  show_countdown: true,
  countdown_date: "2026-01-20T18:00:00.000Z",
};

const APP_ENV = import.meta.env.VITE_APP_ENV ?? "prod";

export function useMaintenance() {
  const [settings, setSettings] =
    useState<MaintenanceSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("maintenance_settings")
        .select("enabled")
        .eq("env", APP_ENV)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Row not found, use defaults
          setSettings(DEFAULT_SETTINGS);
        } else {
          console.error("Error fetching maintenance settings:", error);
        }
      } else if (data) {
        setSettings((prev) => ({
          ...prev,
          enabled: data.enabled,
        }));
      }
    } catch (err) {
      console.error("Error fetching maintenance settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Partial<MaintenanceSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };

    try {
      const { error } = await supabase.from("maintenance_settings").upsert(
        {
          env: APP_ENV,
          enabled: updatedSettings.enabled,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "env" }
      );

      if (error) {
        console.error("Error updating maintenance settings:", error);
        return { error };
      }

      setSettings(updatedSettings);
      return { error: null };
    } catch (err) {
      console.error("Error updating maintenance settings:", err);
      return { error: err };
    }
  };

  return {
    settings,
    loading,
    updateSettings,
    refetch: fetchSettings,
    env: APP_ENV,
  };
}
