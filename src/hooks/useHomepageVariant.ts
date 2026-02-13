import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type HomepageVariant = "v1" | "v2";

const DEFAULT_VARIANT: HomepageVariant = "v1";
const STORAGE_KEY = "homepage_variant";

function parseVariant(value: Json | null | undefined): HomepageVariant {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "variant" in value
  ) {
    const v = (value as Record<string, unknown>).variant;
    return v === "v2" ? "v2" : DEFAULT_VARIANT;
  }

  return value === "v2" ? "v2" : DEFAULT_VARIANT;
}

function readStoredVariant(): HomepageVariant {
  if (typeof window === "undefined") return DEFAULT_VARIANT;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "v2" ? "v2" : DEFAULT_VARIANT;
}

function storeVariant(variant: HomepageVariant) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, variant);
}

export function useHomepageVariant() {
  const [variant, setVariant] = useState<HomepageVariant>(readStoredVariant);
  const [loading, setLoading] = useState(false);

  const fetchVariant = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("id,value,updated_at")
      .eq("key", "homepage_variant")
      .order("updated_at", { ascending: false })
      .limit(1);

    if (error) {
      return;
    }

    const row = data?.[0];
    if (!row) return;

    const parsed = parseVariant(row.value);
    setVariant(parsed);
    storeVariant(parsed);
  };

  const updateVariant = async (nextVariant: HomepageVariant) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ value: nextVariant as unknown as Json } as never)
      .eq("key", "homepage_variant");

    if (error) {
      return { error };
    }

    setVariant(nextVariant);
    storeVariant(nextVariant);
    return { error: null };
  };

  useEffect(() => {
    fetchVariant();
  }, []);

  return { variant, loading, updateVariant, refetch: fetchVariant };
}
