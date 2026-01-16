import { useEffect, useState } from "react";
import { usePageKey } from "./usePageKey";

export function useABVariant(
  testPrefix = "cta",
  variants = ["A", "B"]
): string {
  const pageKey = usePageKey(); // es. "services", "contacts", "mvp"
  const testId = `${testPrefix}-${pageKey}`; // es. "cta-contacts"

  const [variant, setVariant] = useState(() => {
    if (typeof window === "undefined") return variants[0]; // SSR fallback
    const stored = localStorage.getItem(testId);
    return stored && variants.includes(stored)
      ? stored
      : variants[Math.floor(Math.random() * variants.length)];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(testId);
    if (!stored || !variants.includes(stored)) {
      localStorage.setItem(testId, variant);
    }
  }, [testId, variant, variants]);

  return variant;
}
