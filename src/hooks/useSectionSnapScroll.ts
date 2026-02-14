import { useEffect } from "react";

interface UseSectionSnapScrollOptions {
  mobileBreakpoint?: number;
  scrollThreshold?: number;
  animationDurationMs?: number;
  animationLockMs?: number;
  enabled?: boolean;
}

const DEFAULT_OPTIONS: Required<UseSectionSnapScrollOptions> = {
  mobileBreakpoint: 768,
  scrollThreshold: 24,
  animationDurationMs: 360,
  animationLockMs: 420,
  enabled: true,
};

export function useSectionSnapScroll(
  sectionIds: string[],
  options: UseSectionSnapScrollOptions = {}
) {
  const {
    mobileBreakpoint,
    scrollThreshold,
    animationDurationMs,
    animationLockMs,
    enabled,
  } = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const isMobile = () => window.innerWidth < mobileBreakpoint;
    type SnapPoint = { node: HTMLElement; sectionId: string; targetTop: number };

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

    let isAnimating = false;
    let accumulatedDelta = 0;
    let animationFrameId = 0;

    const getHeaderHeight = () => {
      const header = document.querySelector("header");
      if (!header) return 0;
      const rect = header.getBoundingClientRect();
      return rect.height > 0 ? rect.height : 0;
    };

    const getMaxScrollTop = () => {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const getViewportCenterLine = () => {
      const headerHeight = getHeaderHeight();
      return headerHeight + (window.innerHeight - headerHeight) / 2;
    };

    const getTargetTopForNode = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      const anchorCenterY = window.scrollY + rect.top + rect.height / 2;
      return Math.max(
        0,
        Math.min(getMaxScrollTop(), anchorCenterY - getViewportCenterLine())
      );
    };

    const isUsableAnchor = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      return rect.height > 40 && rect.width > 40;
    };

    const getSnapPoints = (): SnapPoint[] => {
      const sections = getSections();
      const points: SnapPoint[] = [];
      const seen = new Set<HTMLElement>();
      const minTargetDistance = Math.max(48, window.innerHeight * 0.08);

      sections.forEach((section) => {
        const explicitAnchors = Array.from(
          section.querySelectorAll(
            "[data-snap-anchor], .snap-anchor"
          )
        ).filter((el): el is HTMLElement => el instanceof HTMLElement);

        const candidates =
          explicitAnchors.length > 0
            ? explicitAnchors
            : [
                (section.querySelector(
                  ":scope > .container-wide, :scope > .container-base, :scope > .container-tight, :scope > .container-fluid"
                ) as HTMLElement | null) ?? section,
              ];

        candidates.forEach((candidate) => {
          if (!seen.has(candidate) && isUsableAnchor(candidate)) {
            seen.add(candidate);
            const targetTop = getTargetTopForNode(candidate);
            const duplicateTarget = points.some(
              (point) =>
                point.sectionId === section.id &&
                Math.abs(point.targetTop - targetTop) < minTargetDistance
            );

            if (!duplicateTarget) {
              points.push({ node: candidate, sectionId: section.id, targetTop });
            }
          }
        });
      });

      return points;
    };

    const getCurrentPointIndex = () => {
      const points = getSnapPoints();
      if (points.length === 0) return 0;
      const viewportCenter = getViewportCenterLine();
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < points.length; i++) {
        const rect = points[i].node.getBoundingClientRect();
        const anchorCenter = rect.top + rect.height / 2;

        if (rect.top <= viewportCenter && rect.bottom > viewportCenter) {
          return i;
        }

        const distance = Math.abs(anchorCenter - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }

      return nearestIndex;
    };

    const scrollToPoint = (index: number) => {
      const points = getSnapPoints();
      const targetPoint = points[index];

      if (!targetPoint || isAnimating) return;

      isAnimating = true;
      const targetTop = targetPoint.targetTop;

      const startTop = window.scrollY;
      const delta = targetTop - startTop;
      const startTime = performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / animationDurationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startTop + delta * eased);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(animateScroll);
        }
      };

      animationFrameId = window.requestAnimationFrame(animateScroll);

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

      if (Math.abs(accumulatedDelta) > scrollThreshold) {
        const points = getSnapPoints();
        if (points.length === 0) return;

        const direction = accumulatedDelta > 0 ? 1 : -1;
        const currentIndex = getCurrentPointIndex();
        const nextIndex = Math.max(
          0,
          Math.min(points.length - 1, currentIndex + direction)
        );

        if (nextIndex !== currentIndex) {
          scrollToPoint(nextIndex);
        }

        accumulatedDelta = 0;
      }
    };

    if (!isMobile()) {
      document.documentElement.classList.add("has-js-wheel-snap");
      document.body.classList.add("has-js-wheel-snap");
    }

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove("has-js-wheel-snap");
      document.body.classList.remove("has-js-wheel-snap");
    };
  }, [
    sectionIds,
    mobileBreakpoint,
    scrollThreshold,
    animationDurationMs,
    animationLockMs,
    enabled,
  ]);
}
