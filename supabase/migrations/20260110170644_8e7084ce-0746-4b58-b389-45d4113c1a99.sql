-- Insert maintenance_mode setting with default values
INSERT INTO public.site_settings (key, value)
VALUES (
  'maintenance_mode',
  '{"enabled": false, "title": "Sito in manutenzione", "subtitle": "Torneremo presto con novità!", "show_countdown": false, "countdown_date": null}'::jsonb
)
ON CONFLICT (key) DO NOTHING;