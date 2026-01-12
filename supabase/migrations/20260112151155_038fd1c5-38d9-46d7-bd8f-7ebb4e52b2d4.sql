-- Fix: Replace overly permissive RLS policy on site_settings
-- This restricts public reads to only whitelisted keys

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;

-- Create a more restrictive policy that only allows specific keys to be read publicly
CREATE POLICY "Public can read whitelisted site settings"
ON public.site_settings
FOR SELECT
USING (
  key IN ('availability', 'maintenance_mode')
);