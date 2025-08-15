import { z } from "zod";
import { passwordSchema } from "./register.schema";

export const requestPasswordResetSchema = z.object({
  email: z.email("Email is required"),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type RequestPasswordResetSchema = z.infer<
  typeof requestPasswordResetSchema
>;
