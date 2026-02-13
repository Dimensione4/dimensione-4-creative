-- Create maintenance settings table (missing base migration)
-- This must run before 20260113092520_* that alters the same table.

CREATE TABLE IF NOT EXISTS public.maintenance_settings (
  env text PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text,
  subtitle text,
  show_countdown boolean DEFAULT false,
  countdown_date timestamptz
);

ALTER TABLE public.maintenance_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read maintenance settings" ON public.maintenance_settings;
CREATE POLICY "Public can read maintenance settings"
ON public.maintenance_settings
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can update maintenance settings" ON public.maintenance_settings;
CREATE POLICY "Admins can update maintenance settings"
ON public.maintenance_settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert maintenance settings" ON public.maintenance_settings;
CREATE POLICY "Admins can insert maintenance settings"
ON public.maintenance_settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_maintenance_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_maintenance_settings_updated_at ON public.maintenance_settings;
CREATE TRIGGER update_maintenance_settings_updated_at
BEFORE UPDATE ON public.maintenance_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_maintenance_settings_timestamp();

INSERT INTO public.maintenance_settings (env, enabled)
VALUES
  ('local', false),
  ('staging', false),
  ('prod', false)
ON CONFLICT (env) DO NOTHING;

