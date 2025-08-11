import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
  remember: z.boolean().default(false).nullable().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
