"use server";

import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";
import { getGeneralSettings } from "@/lib/api";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 emails per hour
    return false;
  }

  limit.count++;
  return true;
}

export async function sendContactEmail(
  formData: z.infer<typeof contactFormSchema>
) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData);

    // Simple rate limiting (in production, use IP from headers)
    const canSend = checkRateLimit("user");
    if (!canSend) {
      return {
        success: false,
        error: "För många förfrågningar. Försök igen senare.",
      };
    }

    // Get email settings from CMS
    const settings = getGeneralSettings();

    if (!settings.contactEmail) {
      return {
        success: false,
        error: "E-postkonfiguration saknas. Kontakta administratören.",
      };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: settings.fromEmail || "onboarding@resend.dev",
      to: settings.contactEmail,
      replyTo: validatedData.email,
      subject: `Kontaktformulär: ${validatedData.subject}`,
      html: `
        <h2>Nytt meddelande från kontaktformuläret</h2>
        <p><strong>Namn:</strong> ${validatedData.name}</p>
        <p><strong>E-post:</strong> ${validatedData.email}</p>
        <p><strong>Ämne:</strong> ${validatedData.subject}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Email send error:", error);
      return {
        success: false,
        error: "Det gick inte att skicka meddelandet. Försök igen senare.",
      };
    }

    return {
      success: true,
      message: "Meddelandet har skickats!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Ogiltig formulärdata. Kontrollera dina uppgifter.",
      };
    }

    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Ett oväntat fel uppstod. Försök igen senare.",
    };
  }
}
