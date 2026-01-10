-- Add restrictive policies to protect contact submissions data
-- Only authenticated admins should be able to read/update/delete submissions

-- Block all SELECT access via API (owner can still view via dashboard)
CREATE POLICY "No public read access" 
ON public.contact_submissions 
FOR SELECT 
USING (false);

-- Block all UPDATE access
CREATE POLICY "No public update access" 
ON public.contact_submissions 
FOR UPDATE 
USING (false);

-- Block all DELETE access
CREATE POLICY "No public delete access" 
ON public.contact_submissions 
FOR DELETE 
USING (false);