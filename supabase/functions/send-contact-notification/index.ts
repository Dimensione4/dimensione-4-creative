import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM_EMAIL =
  Deno.env.get("RESEND_FROM_EMAIL") || "no-reply@dimensione4.it";
const CONTACT_OWNER_EMAIL =
  Deno.env.get("CONTACT_OWNER_EMAIL") || "dariomarcobellini@dimensione4.it";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  message: string;
  website?: string;
}

function normalizeWebsiteUrl(website: string): string {
  const trimmed = website.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildContactFooterHtml(): string {
  return `
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #d9e6f2;">
      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#0f172a;">
        Dimensione 4 di Dario Marco Bellini
      </p>
      <p style="margin:0 0 12px;font-size:12px;color:#475569;">
        P.IVA 04678930167
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0 12px 8px 0;">
            <a href="mailto:dariomarcobellini@dimensione4.it" style="font-size:13px;color:#0f8f88;text-decoration:none;">[Email]</a>
          </td>
          <td style="padding:0 12px 8px 0;">
            <a href="https://wa.me/393334404903" style="font-size:13px;color:#0f8f88;text-decoration:none;">[WhatsApp] +39 3334404903</a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 12px 8px 0;">
            <a href="https://linkedin.com/in/dariobellini" style="font-size:13px;color:#0f8f88;text-decoration:none;">in LinkedIn</a>
          </td>
          <td style="padding:0 12px 8px 0;">
            <a href="https://github.com/Dimensione4" style="font-size:13px;color:#0f8f88;text-decoration:none;">{} GitHub</a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 12px 0 0;">
            <a href="https://x.com/Dimensione4it" style="font-size:13px;color:#0f8f88;text-decoration:none;">X / Twitter</a>
          </td>
          <td style="padding:0 12px 0 0;">
            <a href="https://instagram.com/dimensione4.it" style="font-size:13px;color:#0f8f88;text-decoration:none;">Instagram</a>
          </td>
          <td style="padding:0;">
            <a href="https://tiktok.com/@dimensione4.it" style="font-size:13px;color:#0f8f88;text-decoration:none;">TikTok</a>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function buildOwnerNotificationHtml(input: {
  safeName: string;
  safeEmail: string;
  safeWebsite: string | null;
  safeMessage: string;
}): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;padding:0;margin:0;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9e6f2;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;background:linear-gradient(90deg,#0d2a38,#113b4d);color:#ffffff;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="vertical-align:middle;padding-right:10px;">
                  <span style="display:inline-flex;width:32px;height:32px;border-radius:999px;background:#ffffff;align-items:center;justify-content:center;">
                    <img src="https://dimensione4.it/favicon.png" alt="Dimensione 4" width="20" height="20" style="display:block;border:0;outline:none;">
                  </span>
                </td>
                <td style="vertical-align:middle;">
                  <p style="margin:0;font-size:12px;letter-spacing:0.9px;text-transform:uppercase;opacity:0.9;">Dimensione 4</p>
                  <h1 style="margin:2px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">Nuovo contatto dal sito</h1>
                </td>
              </tr>
            </table>
            <p style="margin:10px 0 0;font-size:13px;opacity:0.9;">Modulo contatti</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <p style="margin:0 0 16px;font-size:14px;color:#475569;">Dettagli lead ricevuto:</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#0f8f88;font-size:13px;">Nome</td><td style="padding:8px 0;font-size:14px;color:#0f172a;">${input.safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#0f8f88;font-size:13px;">Email</td><td style="padding:8px 0;font-size:14px;color:#0f172a;">${input.safeEmail}</td></tr>
              ${input.safeWebsite ? `<tr><td style="padding:8px 0;color:#0f8f88;font-size:13px;">Sito</td><td style="padding:8px 0;font-size:14px;color:#0f172a;">${input.safeWebsite}</td></tr>` : ""}
            </table>
            <div style="margin-top:18px;padding:14px;border:1px solid #d9e6f2;background:#f8fbff;border-radius:10px;">
              <p style="margin:0 0 8px;color:#0f8f88;font-size:13px;">Messaggio</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;">${input.safeMessage}</p>
            </div>
            ${buildContactFooterHtml()}
          </td>
        </tr>
      </table>
    </div>
  `;
}

function buildAutoReplyHtml(input: {
  safeName: string;
  safeEmail: string;
  safeWebsite: string | null;
  safeMessage: string;
  websiteUrl: string | null;
}): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;padding:0;margin:0;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9e6f2;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;background:linear-gradient(90deg,#0d2a38,#113b4d);color:#ffffff;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="vertical-align:middle;padding-right:10px;">
                  <span style="display:inline-flex;width:32px;height:32px;border-radius:999px;background:#ffffff;align-items:center;justify-content:center;">
                    <img src="https://dimensione4.it/favicon.png" alt="Dimensione 4" width="20" height="20" style="display:block;border:0;outline:none;">
                  </span>
                </td>
                <td style="vertical-align:middle;">
                  <p style="margin:0;font-size:12px;letter-spacing:0.9px;text-transform:uppercase;opacity:0.9;">Dimensione 4</p>
                  <h1 style="margin:2px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">Messaggio ricevuto con successo</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <p style="margin:0 0 10px;font-size:16px;line-height:1.6;">Ciao <strong>${input.safeName}</strong>, grazie per avermi scritto.</p>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#475569;">
              Ho ricevuto la tua richiesta e ti ricontattero entro <strong>24 ore lavorative</strong>.
            </p>
            <div style="padding:14px;border:1px solid #d9e6f2;background:#f8fbff;border-radius:10px;">
              <p style="margin:0 0 8px;color:#0f8f88;font-size:13px;">Riepilogo della tua richiesta</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:#0f8f88;font-size:13px;">Nome</td><td style="padding:6px 0;font-size:14px;color:#0f172a;">${input.safeName}</td></tr>
                <tr><td style="padding:6px 0;color:#0f8f88;font-size:13px;">Email</td><td style="padding:6px 0;font-size:14px;color:#0f172a;">${input.safeEmail}</td></tr>
                ${input.safeWebsite ? `<tr><td style="padding:6px 0;color:#0f8f88;font-size:13px;">Sito/Repository</td><td style="padding:6px 0;font-size:14px;color:#0f172a;">${input.safeWebsite}</td></tr>` : ""}
              </table>
              <div style="margin-top:12px;">
                <p style="margin:0 0 6px;color:#0f8f88;font-size:13px;">Messaggio</p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;">${input.safeMessage}</p>
              </div>
            </div>
            <p style="margin:16px 0 0;font-size:13px;color:#475569;">
              Nel frattempo puoi prenotare direttamente una call da qui:
              <a href="https://dimensione4.it/contatti#calendly" style="color:#25d9e4;">dimensione4.it/contatti#calendly</a>
            </p>
            ${input.websiteUrl ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">Link inserito: <a href="${input.websiteUrl}" style="color:#25d9e4;">${input.safeWebsite}</a></p>` : ""}
            ${buildContactFooterHtml()}
          </td>
        </tr>
      </table>
    </div>
  `;
}
// HTML encode user inputs to prevent XSS in email clients
function htmlEncode(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Validate input data
function validateInput(data: unknown): { valid: boolean; error?: string; data?: ContactNotificationRequest } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, message, website } = data as Record<string, unknown>;

  // Validate required fields
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return { valid: false, error: 'Invalid name: must be 1-100 characters' };
  }

  if (typeof email !== 'string' || email.trim().length === 0 || email.length > 255) {
    return { valid: false, error: 'Invalid email: must be 1-255 characters' };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
    return { valid: false, error: 'Invalid message: must be 1-5000 characters' };
  }

  // Optional website validation
  if (website !== undefined && website !== null && website !== '') {
    if (typeof website !== 'string' || website.length > 500) {
      return { valid: false, error: 'Invalid website: must be under 500 characters' };
    }
    // Basic URL format check (allow URLs that start with http/https or are domains)
    const urlRegex = /^(https?:\/\/)?[a-zA-Z0-9][a-zA-Z0-9-]*(\.[a-zA-Z0-9-]+)+/;
    if (website.trim() !== '' && !urlRegex.test(website)) {
      return { valid: false, error: 'Invalid website format' };
    }
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      website: typeof website === 'string' ? website.trim() : undefined,
    },
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return new Response(JSON.stringify({ error: "Email service not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const rawData = await req.json();

    // Validate and sanitize input
    const validation = validateInput(rawData);
    if (!validation.valid || !validation.data) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { name, email, message, website } = validation.data;

    // HTML encode all user inputs for safe email rendering
    const safeName = htmlEncode(name);
    const safeEmail = htmlEncode(email);
    const safeMessage = htmlEncode(message).replace(/\n/g, "<br>");
    const safeWebsite = website ? htmlEncode(website) : null;
    const websiteUrl = website ? normalizeWebsiteUrl(website) : null;

    // Send notification email to site owner
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Dimensione 4 <${RESEND_FROM_EMAIL}>`,
        to: [CONTACT_OWNER_EMAIL],
        reply_to: email,
        subject: `Nuovo messaggio da ${safeName}`,
        html: buildOwnerNotificationHtml({
          safeName,
          safeEmail,
          safeWebsite,
          safeMessage,
        }),
      }),
    });

    if (!notificationRes.ok) {
      const errorData = await notificationRes.text();
      console.error("Notification email error:", errorData);
      throw new Error(`Failed to send notification`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the user
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Dimensione 4 <${RESEND_FROM_EMAIL}>`,
        to: [email], // Use validated email, not HTML encoded
        subject: "Dimensione 4 · richiesta ricevuta (risposta entro 24h)",
        html: buildAutoReplyHtml({
          safeName,
          safeEmail,
          safeWebsite,
          safeMessage,
          websiteUrl,
        }),
      }),
    });

    if (!confirmationRes.ok) {
      const errorData = await confirmationRes.text();
      console.error("Confirmation email error:", errorData);
      // Don't throw - notification was sent, just log the confirmation failure
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true, confirmationSent: confirmationRes.ok }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-notification function:", error);
    // Return generic error message without exposing internal details
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);


