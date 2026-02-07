import { useEffect } from "react";

interface UseSectionSnapScrollOptions {
  mobileBreakpoint?: number;
  scrollThreshold?: number;
  debounceMs?: number;
  animationLockMs?: number;
  enabled?: boolean;
}

const DEFAULT_OPTIONS: Required<UseSectionSnapScrollOptions> = {
  mobileBreakpoint: 768,
  scrollThreshold: 50,
  debounceMs: 50,
  animationLockMs: 600,
  enabled: true,
};

export function useSectionSnapScroll(
  sectionIds: string[],
  options: UseSectionSnapScrollOptions = {}
) {
  const {
    mobileBreakpoint,
    scrollThreshold,
    debounceMs,
    animationLockMs,
    enabled,
  } = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const isMobile = () => window.innerWidth < mobileBreakpoint;
    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

    let isAnimating = false;
    let accumulatedDelta = 0;
    let scrollTimeout: number | undefined;

    const getHeaderHeight = () => {
      const header = document.querySelector("header");
      if (!header) return 0;
      const rect = header.getBoundingClientRect();
      return rect.height > 0 ? rect.height : 0;
    };

    const getViewportCenterLine = () => {
      const headerHeight = getHeaderHeight();
      return headerHeight + (window.innerHeight - headerHeight) / 2;
    };

    const getCurrentSectionIndex = () => {
      const sections = getSections();
      const viewportCenter = getViewportCenterLine();
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom > viewportCenter) {
          return i;
        }

        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }

      return nearestIndex;
    };

    const scrollToSection = (index: number) => {
      const sections = getSections();
      const targetSection = sections[index];

      if (!targetSection || isAnimating) return;

      isAnimating = true;
      const rect = targetSection.getBoundingClientRect();
      const sectionCenterY = window.scrollY + rect.top + rect.height / 2;
      const viewportCenterY =
        getHeaderHeight() + (window.innerHeight - getHeaderHeight()) / 2;
      const targetTop = Math.max(0, sectionCenterY - viewportCenterY);
      window.scrollTo({ top: targetTop, behavior: "smooth" });

      window.setTimeout(() => {
        isAnimating = false;
        accumulatedDelta = 0;
      }, animationLockMs);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMobile()) return;

      e.preventDefault();
      if (isAnimating) return;

      accumulatedDelta += e.deltaY;

      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }

      scrollTimeout = window.setTimeout(() => {
        if (Math.abs(accumulatedDelta) > scrollThreshold) {
          const direction = accumulatedDelta > 0 ? 1 : -1;
          const currentIndex = getCurrentSectionIndex();
          const nextIndex = Math.max(
            0,
            Math.min(sectionIds.length - 1, currentIndex + direction)
          );

          if (nextIndex !== currentIndex) {
            scrollToSection(nextIndex);
          }
        }
        accumulatedDelta = 0;
      }, debounceMs);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
    };
  }, [
    sectionIds,
    mobileBreakpoint,
    scrollThreshold,
    debounceMs,
    animationLockMs,
    enabled,
  ]);
}
