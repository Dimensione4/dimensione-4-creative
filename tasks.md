# Dimensione 4 — MVP Tasks

> **Source of truth for implementation order.**  
> Reference docs: `masterplan.md`, `implementation-plan.md`, `design-guidelines.md`, `app-flow-pages-and-roles.md`, `preview-the-process.md`

---

## 📊 Status Legend

- ⬜ To Do
- 🟡 In Progress
- ✅ Done

---

## ✅ Phase 0: Foundation (COMPLETED)

- [x] Project setup (Vite + React + TypeScript)
- [x] Tailwind CSS + shadcn/ui configuration
- [x] Design system: Abyss Teal dark theme, typography, spacing
- [x] Light theme CSS tokens (not yet toggleable)
- [x] Routing setup (React Router)
- [x] Layout components (Header, Footer, Layout)
- [x] Home page (Hero, Concept, Services, Method, Proof, CTA)
- [x] Servizi page
- [x] Metodo page
- [x] Abbonamento page (base version)
- [x] Chi Sono page
- [x] Contatti page (UI only)
- [x] 404 page
- [x] Framer Motion animations

---

## ✅ Phase 1: Backend Setup (Lovable Cloud)

### 1.1 Enable Lovable Cloud
- [x] Activate Lovable Cloud integration
- [x] Verify Supabase connection

### 1.2 Create `contact_submissions` Table ✅

**Schema (IMPLEMENTED):**
```sql
-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
```

**RLS Policies:**
```sql
-- Allow anonymous inserts (public contact form)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only service role can read (for admin/edge functions)
-- No public SELECT policy = submissions not readable from frontend
-- Access via Supabase dashboard or edge functions only
```

> **Note:** No public SELECT policy means form data is write-only from frontend. Review submissions via Supabase dashboard or future admin panel.

### 1.3 (Optional) Email Notification Edge Function

**Prerequisites:**
- User creates Resend account: https://resend.com
- User validates domain: https://resend.com/domains
- User creates API key: https://resend.com/api-keys
- Add `RESEND_API_KEY` to Lovable secrets

**Edge Function: `send-contact-notification`**
```typescript
// supabase/functions/send-contact-notification/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  website?: string;
  message: string;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, website, message }: ContactRequest = await req.json();

    // Send notification to admin
    await resend.emails.send({
      from: "Dimensione 4 <noreply@yourdomain.com>",
      to: ["info@dimensione4.it"], // Admin email
      subject: `Nuovo contatto: ${name}`,
      html: `
        <h2>Nuovo messaggio dal sito</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${website ? `<p><strong>Sito:</strong> ${website}</p>` : ""}
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Optional: Send confirmation to user
    await resend.emails.send({
      from: "Dimensione 4 <noreply@yourdomain.com>",
      to: [email],
      subject: "Messaggio ricevuto — Dimensione 4",
      html: `
        <p>Ciao ${name},</p>
        <p>Ho ricevuto il tuo messaggio e ti risponderò entro 24 ore lavorative.</p>
        <p>A presto,<br>Dario</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
```

---

## ✅ Phase 2: Contact Form Integration

### 2.1 Form Validation Schema ✅
- [x] Add zod validation to contact form
- [x] Client-side validation with proper Italian error messages

**Validation Schema:**
```typescript
// src/lib/validations/contact.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Il nome è obbligatorio")
    .max(100, "Il nome è troppo lungo"),
  email: z
    .string()
    .trim()
    .email("Inserisci un'email valida")
    .max(255, "L'email è troppo lunga"),
  website: z
    .string()
    .trim()
    .url("Inserisci un URL valido")
    .max(500, "L'URL è troppo lungo")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Il messaggio deve contenere almeno 10 caratteri")
    .max(2000, "Il messaggio è troppo lungo (max 2000 caratteri)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### 2.2 Connect Form to Supabase ✅
- [x] Create Supabase client utility
- [x] Submit form data to `contact_submissions` table
- [x] Handle loading/success/error states
- [x] Show toast notifications

### 2.3 Success/Error States ✅
- [x] Loading spinner on button during submission
- [x] Success message with confirmation
- [x] Error handling with user-friendly messages
- [ ] Rate limiting consideration (future)

---

## ⬜ Phase 3: Theme Toggle

### 3.1 Theme Provider
- [ ] Create ThemeProvider context
- [ ] Detect system preference on first visit
- [ ] Default to dark theme

**Implementation:**
```typescript
// src/components/ThemeProvider.tsx
// Use next-themes (already installed) or custom context
// Persist to localStorage key: "dimensione4-theme"
// Values: "dark" | "light" | "system"
```

### 3.2 Toggle Component
- [ ] Add toggle button to Header (desktop + mobile)
- [ ] Sun/Moon icon with smooth transition
- [ ] Respect design system spacing

**Placement:**
- Desktop: Before "Prenota una call" CTA button
- Mobile: In mobile menu, near bottom

### 3.3 Transition Effects
- [ ] 200-300ms transition on theme switch
- [ ] No flash on page load (SSR consideration)
- [ ] Smooth color transitions on all surfaces

**CSS Additions:**
```css
/* Add to index.css */
html {
  transition: background-color 200ms ease, color 200ms ease;
}

/* Disable transitions on first load to prevent flash */
html.no-transitions * {
  transition: none !important;
}
```

---

## ⬜ Phase 4: Missing Pages

### 4.1 `/mvp` — MVP Custom Page

**Structure (ref: `app-flow-pages-and-roles.md`):**
- Hero: Clear value prop for founders with MVP ideas
- Process: Discovery → Scope → Build → Launch → Iterate
- What's Included: Web MVP (Next.js), optional Flutter
- Timeline: Typical 4-12 weeks
- CTA: Book discovery call

**Sections:**
1. Hero + intro
2. "Per chi è questo servizio" (ideal client profile)
3. Process steps (similar to Method page but MVP-focused)
4. Tech stack + deliverables
5. FAQ (3-4 common questions)
6. CTA section

### 4.2 `/progetti` — Case Studies Page

**Structure:**
- Hero: Portfolio intro
- Filter/category tabs (optional for MVP, can be static)
- Project cards (3 placeholders)
- CTA: "Hai un progetto simile?"

**Case Study Card Schema (for future CMS):**
```typescript
interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string; // Brief context
  clientType: string; // e.g., "Startup", "SME", "Agency"
  stack: string[]; // e.g., ["Next.js", "Supabase", "Framer Motion"]
  results: string[]; // e.g., ["50% faster load time", "2x conversion"]
  thumbnail: string; // Image URL
  featured: boolean;
  order: number;
}
```

**Placeholder Projects:**
1. **E-commerce Performance Boost**
   - Client: WooCommerce store
   - Stack: WordPress, PHP, Performance Audit
   - Results: Core Web Vitals green, 3s → 1.2s load time

2. **SaaS MVP Launch**
   - Client: B2B Startup
   - Stack: Next.js, Supabase, Tailwind
   - Results: MVP in 6 weeks, 500 beta signups

3. **Design System Implementation**
   - Client: Tech Agency
   - Stack: React, TypeScript, Storybook
   - Results: 40% faster dev velocity, consistent UI

**Page Note:** Individual case study detail pages (`/progetti/[slug]`) are V1 scope. For MVP, clicking a card opens a modal or expands inline.

---

## ⬜ Phase 5: "Preview the Process" Demo

> Reference: `preview-the-process.md`

### 5.1 Component Structure
- [ ] Create `ProcessDemo` component
- [ ] Accordion-style click-to-expand steps
- [ ] 5 steps as specified

**Location:** `/abbonamento` page, after "Come funziona" section

### 5.2 Step Content

| Step | Icon | Title | Subtitle | Content Preview |
|------|------|-------|----------|-----------------|
| 1 | 📝 | Task Inviato | "Ottimizza la performance su mobile" | Simulated form with brief |
| 2 | 📬 | Risposta Iniziale | "Analisi + proposta in 12h" | Async message with audit summary |
| 3 | 🔧 | Consegna Task | "PR + test + guida deploy" | File tree, test output |
| 4 | 🌀 | Revisione | "Piccoli fix su richiesta" | Feedback bullet points |
| 5 | ✅ | Conclusione | "Task chiuso, documentato" | Recap with next slot note |

### 5.3 Design Specs
- [ ] Use existing accordion component (radix-ui)
- [ ] JetBrains Mono for task labels + timestamps
- [ ] Fade/translate animations (200-300ms)
- [ ] Surface cards with subtle borders

**Component Skeleton:**
```tsx
// src/components/abbonamento/ProcessDemo.tsx
const steps = [
  {
    id: 1,
    icon: "📝",
    title: "Task Inviato",
    subtitle: "Ottimizza la performance su mobile",
    content: <StepOneContent />,
  },
  // ... other steps
];
```

---

## ⬜ Phase 6: Calendly Integration

### 6.1 Embed Component
- [ ] Create `CalendlyEmbed` component
- [ ] Placeholder URL that's easy to swap
- [ ] Responsive iframe or inline widget

**Placement:** 
- `/contatti` page (primary)
- CTAs can link to `/contatti#booking`

**Implementation:**
```tsx
// src/components/CalendlyEmbed.tsx
interface CalendlyEmbedProps {
  url?: string;
}

const CALENDLY_URL = "https://calendly.com/dimensione4/15min"; // Placeholder

export function CalendlyEmbed({ url = CALENDLY_URL }: CalendlyEmbedProps) {
  return (
    <div className="surface-card p-6 md:p-8">
      <h3 className="font-display text-xl font-semibold mb-4">
        Prenota una call di 15 minuti
      </h3>
      <div className="aspect-video bg-surface-hover rounded-lg flex items-center justify-center">
        {/* Replace with actual Calendly inline widget */}
        <iframe
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
```

### 6.2 Calendly Script (when URL provided)
```html
<!-- Add to index.html when ready -->
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

---

## ⬜ Phase 7: Polish & QA

### 7.1 Accessibility Audit
- [ ] Contrast check (AA+ on all text)
- [ ] Focus rings visible on all interactive elements
- [ ] Semantic HTML (landmarks: nav, main, footer)
- [ ] Keyboard navigation test
- [ ] `prefers-reduced-motion` respect

### 7.2 Performance Audit
- [ ] Lighthouse score check (target: 90+ all categories)
- [ ] Image optimization (hero image, future project images)
- [ ] Bundle size review
- [ ] Lazy loading for below-fold content

### 7.3 Mobile Polish
- [ ] Test all pages on mobile viewports
- [ ] Touch target sizes (min 44x44px)
- [ ] Scroll behavior smooth
- [ ] No horizontal overflow

### 7.4 Cross-Browser
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari, Android Chrome

### 7.5 SEO Checklist
- [ ] Meta titles < 60 chars
- [ ] Meta descriptions < 160 chars
- [ ] Open Graph tags on all pages
- [ ] robots.txt verified
- [ ] Sitemap (optional for MVP)

---

## 📁 File Structure (New Files)

```
src/
├── components/
│   ├── abbonamento/
│   │   └── ProcessDemo.tsx          # Phase 5
│   ├── CalendlyEmbed.tsx            # Phase 6
│   └── ThemeToggle.tsx              # Phase 3
├── lib/
│   ├── supabase.ts                  # Phase 1
│   └── validations/
│       └── contact.ts               # Phase 2
├── pages/
│   ├── MVP.tsx                      # Phase 4.1
│   └── Progetti.tsx                 # Phase 4.2
└── context/
    └── ThemeProvider.tsx            # Phase 3

supabase/
└── functions/
    └── send-contact-notification/   # Phase 1.3
        └── index.ts
```

---

## 🗓️ Suggested Execution Order

| Priority | Task | Effort | Dependencies |
|----------|------|--------|--------------|
| 1 | Phase 1.1-1.2: Enable Cloud + DB schema | 30min | None |
| 2 | Phase 2: Contact form integration | 1-2h | Phase 1 |
| 3 | Phase 3: Theme toggle | 1h | None |
| 4 | Phase 4.1: /mvp page | 1-2h | None |
| 5 | Phase 4.2: /progetti page | 2h | None |
| 6 | Phase 5: Process demo | 2h | None |
| 7 | Phase 6: Calendly embed | 30min | Calendly URL |
| 8 | Phase 1.3: Email notifications | 1h | Resend API key |
| 9 | Phase 7: Polish & QA | 2-3h | All above |

---

## 🔮 V1 Scope (Post-MVP)

Not in current scope, but noted for planning:

- [ ] Individual case study detail pages (`/progetti/[slug]`)
- [ ] CMS-driven case studies (Lovable Cloud DB)
- [ ] Admin panel for form submissions
- [ ] Blog/content section
- [ ] Newsletter signup
- [ ] Scroll-triggered timeline version of Process Demo
- [ ] Motion polish (staggered reveals, 4D unfolding effects)

---

## 📝 Notes

- **Italian copy**: All UI text in Italian. English only for code/technical terms.
- **No emoji in UI**: Per design guidelines, keep UI professional. Emoji only in internal docs.
- **Async-first messaging**: All CTAs emphasize async, no-pressure approach.
- **Design system compliance**: All new components must use design tokens from `index.css` / `tailwind.config.ts`.

---

*Last updated: [Auto-generated during implementation]*
