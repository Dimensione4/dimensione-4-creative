import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface SnapItem {
  id: string;
  label: string;
}

const IT_STOP_WORDS = new Set([
  "il",
  "lo",
  "la",
  "i",
  "gli",
  "le",
  "un",
  "uno",
  "una",
  "di",
  "del",
  "della",
  "dei",
  "degli",
  "delle",
  "da",
  "in",
  "su",
  "con",
  "per",
  "tra",
  "fra",
  "e",
  "ed",
  "o",
  "a",
]);

function normalizePathForId(pathname: string) {
  return pathname.replace(/[^\w-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "page";
}

function trimLabel(value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean;
}

function oneWordSummary(text: string) {
  const cleaned = trimLabel(text)
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  const parts = cleaned.split(" ");
  const candidate =
    parts.find((part) => !IT_STOP_WORDS.has(part.toLowerCase())) ?? parts[0];

  if (!candidate) return "";

  return candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();
}

function sectionLabel(section: HTMLElement, index: number) {
  const id = (section.id || "").toLowerCase();
  const customLabel = section.dataset.snapLabel;
  if (customLabel) {
    if (customLabel.toLowerCase().includes("cta")) return "CTA";
    return oneWordSummary(customLabel);
  }

  if (id.includes("cta")) return "CTA";

  const microLabel = section.querySelector(".text-label");
  const microLabelRaw = trimLabel(microLabel?.textContent ?? "");
  if (microLabelRaw.toLowerCase().includes("cta")) return "CTA";
  const microLabelText = oneWordSummary(microLabel?.textContent ?? "");
  if (microLabelText) return microLabelText;

  const heading = section.querySelector("h1, h2, h3");
  const headingRaw = trimLabel(heading?.textContent ?? "");
  if (
    /\b(prenota|call|contatt|match|progetto|insieme)\b/i.test(headingRaw) &&
    headingRaw.length > 0
  ) {
    return "CTA";
  }
  const headingText = oneWordSummary(heading?.textContent ?? "");
  if (headingText) return headingText;

  return `S${index + 1}`;
}

function getHeaderHeight() {
  const header = document.querySelector("header");
  if (!header) return 0;
  const rect = header.getBoundingClientRect();
  return rect.height > 0 ? rect.height : 0;
}

function getViewportCenterLine() {
  const headerHeight = getHeaderHeight();
  return headerHeight + (window.innerHeight - headerHeight) / 2;
}

function getMaxScrollTop() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function getSnapAnchor(section: HTMLElement) {
  const explicitAnchor = section.querySelector(
    "[data-snap-anchor], .snap-anchor",
  ) as HTMLElement | null;
  if (explicitAnchor) return explicitAnchor;

  const primaryContainer = section.querySelector(
    ":scope > .container-wide, :scope > .container-base, :scope > .container-tight, :scope > .container-fluid",
  ) as HTMLElement | null;
  if (primaryContainer) return primaryContainer;

  return section;
}

function centerElementInViewport(element: HTMLElement) {
  const anchor = getSnapAnchor(element);
  const rect = anchor.getBoundingClientRect();
  const anchorCenterY = window.scrollY + rect.top + rect.height / 2;
  const targetTop = Math.max(
    0,
    Math.min(getMaxScrollTop(), anchorCenterY - getViewportCenterLine()),
  );
  window.scrollTo({ top: targetTop, behavior: "smooth" });
}

export function SnapRail() {
  const location = useLocation();
  const [items, setItems] = useState<SnapItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) {
      setItems([]);
      setActiveId("");
      return;
    }

    const pathKey = normalizePathForId(location.pathname);
    const map = new Map<string, HTMLElement>();
    const nextItems: SnapItem[] = [];
    const sections = Array.from(main.querySelectorAll("section")).filter(
      (section) => section.getBoundingClientRect().height > 120,
    ) as HTMLElement[];

    sections.forEach((section, index) => {
      if (!section.id) {
        section.id = `snap-${pathKey}-${index + 1}`;
      }

      const id = section.id;
      map.set(id, section);
      nextItems.push({
        id,
        label: sectionLabel(section, index),
      });
    });

    const footer = document.querySelector("footer") as HTMLElement | null;
    if (footer) {
      if (!footer.id) {
        footer.id = `snap-${pathKey}-footer`;
      }

      map.set(footer.id, footer);
      nextItems.push({ id: footer.id, label: "Footer" });
    }

    elementsRef.current = map;
    setItems(nextItems);

    if (nextItems.length === 0) {
      setActiveId("");
      return;
    }

    const updateActive = () => {
      const viewportCenter = getViewportCenterLine();
      let bestId = nextItems[0].id;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const { id } of nextItems) {
        const element = map.get(id);
        if (!element) continue;

        const anchor = getSnapAnchor(element);
        const rect = anchor.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;

        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      setActiveId(bestId);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  if (items.length < 2) return null;

  return (
    <nav className="snap-rail" aria-label="Navigazione sezioni">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`snap-rail-item ${item.id === activeId ? "is-active" : ""}`}
          onClick={() => {
            const element = elementsRef.current.get(item.id);
            if (!element) return;
            centerElementInViewport(element);
          }}
          aria-label={`Vai a ${item.label}`}
        >
          <span className="snap-rail-bar" />
          <span className="snap-rail-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
