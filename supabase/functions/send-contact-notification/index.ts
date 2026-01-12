import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

    // Send notification email to site owner
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dimensione 4 <noreply@dimensione4.it>",
        to: ["dariomarcobellini@dimensione4.it"],
        subject: `Nuovo messaggio da ${safeName}`,
        html: `
          <h2>Nuovo messaggio dal form di contatto</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${safeWebsite ? `<p><strong>Sito web:</strong> ${safeWebsite}</p>` : ""}
          <p><strong>Messaggio:</strong></p>
          <p>${safeMessage}</p>
        `,
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
        from: "Dimensione 4 <noreply@dimensione4.it>",
        to: [email], // Use validated email, not HTML encoded
        subject: "Abbiamo ricevuto il tuo messaggio!",
        html: `
          <h1>Grazie per averci contattato, ${safeName}!</h1>
          <p>Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.</p>
          <p>Cordiali saluti,<br>Il Team Dimensione 4</p>
        `,
      }),
    });

    if (!confirmationRes.ok) {
      const errorData = await confirmationRes.text();
      console.error("Confirmation email error:", errorData);
      // Don't throw - notification was sent, just log the confirmation failure
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
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
