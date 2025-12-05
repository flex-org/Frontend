// src/lib/schemas/auth.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1) // سيبها فاضية، الترجمة هتحط "مطلوب"
    .email(), // سيبها فاضية، الترجمة هتحط "بريد غير صحيح"
  password: z
    .string()
    .min(8), // سيبها فاضية
});export type LoginValues = z.infer<typeof LoginSchema>;