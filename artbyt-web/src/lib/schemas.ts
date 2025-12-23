import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Namnet måste vara minst 2 tecken")
    .max(100, "Namnet får vara max 100 tecken"),
  email: z.string().email("Ogiltig e-postadress"),
  subject: z
    .string()
    .min(5, "Ämnet måste vara minst 5 tecken")
    .max(200, "Ämnet får vara max 200 tecken"),
  message: z
    .string()
    .min(10, "Meddelandet måste vara minst 10 tecken")
    .max(2000, "Meddelandet får vara max 2000 tecken"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
