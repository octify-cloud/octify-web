import { z } from "zod";
export const passwordConditionNames = [
  {
    label: "At least 8 characters long",
    key: "minLength",
  },
  {
    label: "Contains at least one uppercase letter",
    key: "hasUppercase",
  },

  {
    label: "Contains at least one number",
    key: "hasNumber",
  },
  {
    label: "Contains at least one special character",
    key: "hasSpecialChar",
  },
] as const;

export const validatePassword = (password: string) => {
  const conditions = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noSpaces: !/\s/.test(password),
  };

  const isValid = Object.values(conditions).every(Boolean);

  return { conditions, isValid };
};

export const passwordSchema = z
  .string("Password is required")
  .superRefine((val, ctx) => {
    const { conditions } = validatePassword(val);

    if (!conditions.minLength) {
      ctx.addIssue({
        code: "custom",
        message: "Password must be at least 8 characters long",
      });
    }
    if (!conditions.hasUppercase) {
      ctx.addIssue({
        code: "custom",
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!conditions.hasNumber) {
      ctx.addIssue({
        code: "custom",
        message: "Password must contain at least one number",
      });
    }
    if (!conditions.hasSpecialChar) {
      ctx.addIssue({
        code: "custom",
        message: "Password must contain at least one special character",
      });
    }
    if (!conditions.noSpaces) {
      ctx.addIssue({
        code: "custom",
        message: "Password must not contain spaces",
      });
    }
  });

export const registerSchema = z.object({
  name: z.string("Name is required").min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
