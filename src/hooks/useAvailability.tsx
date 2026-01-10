import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AvailabilitySettings {
  status: "available" | "busy";
  slots: number;
}

export function useAvailability() {
  const [availability, setAvailability] = useState<AvailabilitySettings>({
    status: "available",
    slots: 2
  });
  const [loading, setLoading] = useState(true);

  const fetchAvailability = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "availability")
      .single();

    if (!error && data) {
      const value = data.value as unknown as AvailabilitySettings;
      setAvailability(value);
    }
    setLoading(false);
  };

  const updateAvailability = async (newSettings: AvailabilitySettings) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ value: newSettings as unknown as Record<string, never> })
      .eq("key", "availability");

    if (!error) {
      setAvailability(newSettings);
    }
    return { error };
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return { availability, loading, updateAvailability, refetch: fetchAvailability };
}
