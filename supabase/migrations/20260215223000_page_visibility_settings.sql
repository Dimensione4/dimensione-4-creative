-- Add page_visibility setting and include it in public readable whitelist.

DROP POLICY IF EXISTS "Public can read whitelisted site settings" ON public.site_settings;

CREATE POLICY "Public can read whitelisted site settings"
ON public.site_settings
FOR SELECT
USING (
  key IN ('availability', 'maintenance_mode', 'homepage_variant', 'page_visibility')
);

INSERT INTO public.site_settings (key, value)
VALUES (
  'page_visibility',
  '{"about": true, "services": true, "mvp": true, "projects": true, "method": true, "subscription": true, "contacts": true}'::jsonb
)
ON CONFLICT (key) DO NOTHING;

