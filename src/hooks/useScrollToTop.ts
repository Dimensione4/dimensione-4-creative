import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that scrolls to top of page on route changes
 * Also provides a scrollToTop function for manual triggering
 */
export function useScrollToTop() {
  const location = useLocation();

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  // Return function for manual scrolling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return { scrollToTop };
}