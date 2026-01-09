import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Il nome è obbligatorio")
    .max(100, "Il nome è troppo lungo (max 100 caratteri)"),
  email: z
    .string()
    .trim()
    .min(1, "L'email è obbligatoria")
    .email("Inserisci un'email valida")
    .max(255, "L'email è troppo lunga"),
  website: z
    .string()
    .trim()
    .max(500, "L'URL è troppo lungo")
    .refine(
      (val) => val === "" || val.startsWith("http://") || val.startsWith("https://"),
      "L'URL deve iniziare con http:// o https://"
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Il messaggio deve contenere almeno 10 caratteri")
    .max(2000, "Il messaggio è troppo lungo (max 2000 caratteri)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
