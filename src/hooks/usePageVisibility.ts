import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { RouteKey } from "@/lib/routes/routes";

export type ManagedPageKey =
  | "about"
  | "services"
  | "mvp"
  | "projects"
  | "method"
  | "subscription"
  | "contacts";

export type PageVisibilityMap = Record<ManagedPageKey, boolean>;

const STORAGE_KEY = "page_visibility";

const DEFAULT_VISIBILITY: PageVisibilityMap = {
  about: true,
  services: true,
  mvp: true,
  projects: true,
  method: true,
  subscription: true,
  contacts: true,
};

const MANAGED_KEYS = Object.keys(DEFAULT_VISIBILITY) as ManagedPageKey[];

function readStoredVisibility(): PageVisibilityMap {
  if (typeof window === "undefined") return DEFAULT_VISIBILITY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_VISIBILITY;
    const parsed = JSON.parse(raw) as Partial<PageVisibilityMap>;
    return { ...DEFAULT_VISIBILITY, ...parsed };
  } catch {
    return DEFAULT_VISIBILITY;
  }
}

function storeVisibility(value: PageVisibilityMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function parseVisibility(value: Json | null | undefined): PageVisibilityMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return DEFAULT_VISIBILITY;
  }

  const input = value as Record<string, unknown>;
  const next = { ...DEFAULT_VISIBILITY };

  for (const key of MANAGED_KEYS) {
    if (typeof input[key] === "boolean") {
      next[key] = input[key] as boolean;
    }
  }

  return next;
}

export function usePageVisibility() {
  const [visibility, setVisibility] = useState<PageVisibilityMap>(
    readStoredVisibility
  );
  const [loading, setLoading] = useState(false);

  const fetchVisibility = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "page_visibility")
      .maybeSingle();

    if (!error && data?.value) {
      const parsed = parseVisibility(data.value);
      setVisibility(parsed);
      storeVisibility(parsed);
    }

    setLoading(false);
  };

  const updateVisibility = async (next: PageVisibilityMap) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert(
        { key: "page_visibility", value: next as unknown as Json } as never,
        { onConflict: "key" }
      );

    if (error) {
      return { error };
    }

    setVisibility(next);
    storeVisibility(next);
    return { error: null };
  };

  const setPageVisibility = async (key: ManagedPageKey, enabled: boolean) => {
    const next = { ...visibility, [key]: enabled };
    return updateVisibility(next);
  };

  const isVisible = (key: RouteKey) => {
    if (!MANAGED_KEYS.includes(key as ManagedPageKey)) return true;
    return visibility[key as ManagedPageKey] ?? true;
  };

  useEffect(() => {
    fetchVisibility();
  }, []);

  return {
    visibility,
    loading,
    setPageVisibility,
    isVisible,
    refetch: fetchVisibility,
  };
}
