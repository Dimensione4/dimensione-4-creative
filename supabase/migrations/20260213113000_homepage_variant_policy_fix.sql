-- Allow homepage variant to be read publicly and ensure default row exists.

DROP POLICY IF EXISTS "Public can read whitelisted site settings" ON public.site_settings;

CREATE POLICY "Public can read whitelisted site settings"
ON public.site_settings
FOR SELECT
USING (
  key IN ('availability', 'maintenance_mode', 'homepage_variant')
);

INSERT INTO public.site_settings (key, value)
VALUES ('homepage_variant', '"v1"'::jsonb)
ON CONFLICT (key) DO NOTHING;

