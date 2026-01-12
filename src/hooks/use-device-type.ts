import { useState, useEffect } from "react";

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const getDeviceType = (): DeviceType => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) return 'mobile';
      if (width < TABLET_BREAKPOINT) return 'tablet';
      return 'desktop';
    };

    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}

// Helper to get aspect ratio category
export function getAspectRatioCategory(): 'portrait' | 'landscape' | 'square' {
  if (typeof window === 'undefined') return 'landscape';
  const ratio = window.innerWidth / window.innerHeight;
  if (ratio < 0.8) return 'portrait';
  if (ratio > 1.2) return 'landscape';
  return 'square';
}
