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
  title: "Sito in manutenzione",
  subtitle: "Torneremo presto con novità!",
  show_countdown: false,
  countdown_date: null
};

export function useMaintenance() {
  const [settings, setSettings] = useState<MaintenanceSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "maintenance_mode")
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Row not found, use defaults
          setSettings(DEFAULT_SETTINGS);
        } else {
          console.error("Error fetching maintenance settings:", error);
        }
      } else if (data?.value) {
        setSettings(data.value as unknown as MaintenanceSettings);
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
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          key: "maintenance_mode",
          value: updatedSettings
        }, {
          onConflict: "key"
        });

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
    refetch: fetchSettings
  };
}
