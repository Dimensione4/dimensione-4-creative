-- Aggiungere nuove colonne
ALTER TABLE public.maintenance_settings
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS subtitle text,
ADD COLUMN IF NOT EXISTS show_countdown boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS countdown_date timestamptz;

-- Set valori default per righe esistenti
UPDATE public.maintenance_settings
SET
  title = COALESCE(title, 'Sto riallineando la Quarta Dimensione.'),
  subtitle = COALESCE(subtitle, 'Un intervento tra prospettiva, struttura e tempo. Torno online a breve.'),
  show_countdown = COALESCE(show_countdown, false);