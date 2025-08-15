"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import Link from "next/link";
import CustomFormField, {
  FormFieldType,
} from "@/components/general/custom-form-field";
import GithubSVG from "@/components/svgs/github";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/auth-client";

import { sooner } from "@/utils/sooner";
import { Label } from "@/components/ui/label";
import {
  passwordConditionNames,
  RegisterSchema,
  registerSchema,
  validatePassword,
} from "@/types/schemas/client/register.schema";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import PasswordStrength from "@/components/general/password-strength";

export default function RegisterForm() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [loadingSignup, startSignup] = useTransition();
  const [loadingGithub, startGitubSignup] = useTransition();
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });
  const password = form.watch("password");

  const handleRegister = (data: RegisterSchema) => {
    startSignup(async () => {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/login?email-verified=true",
      });
      if (res.error?.message) {
        sooner.error(res.error.message);
        return;
      }
      setEmailSent(true);
    });
  };
  const handleGithubRegister = () => {
    startGitubSignup(async () => {
      const data = await authClient.signIn.social({
        provider: "github",
      });
      if (data.error?.message) {
        sooner.error(data.error.message);
        return;
      }
    });
  };

  if (emailSent) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <img
          className="w-[100px]"
          src={"/assets/register-page/open-email.png"}
        />
        <p className="text-center font-medium">
          We've sent a verification email to your inbox. Please check your email
          to complete the process.
        </p>
        <Link href={"/"}>
          <Button>Back to home page</Button>
        </Link>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className={"flex flex-col gap-6"}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <img className="mb-3 w-[90px]" src={"/assets/general/logo.png"} />
          <h1 className="text-2xl font-bold">Register a new account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <CustomFormField
            name="name"
            placeholder="Mahmoud Khaled"
            control={form.control}
            label="First Name"
          />
          <CustomFormField
            name="email"
            placeholder="m@example.com"
            control={form.control}
            label="Email"
            inputType="email"
          />
          <CustomFormField
            name="password"
            placeholder="*******"
            control={form.control}
            label="Password"
            inputType="password"
          />
          <PasswordStrength password={password} />

          <Button loading={loadingSignup} type="submit" className="w-full">
            Create account
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            loading={loadingGithub}
            onClick={handleGithubRegister}
            variant="outline"
            className="w-full"
          >
            <GithubSVG />
            GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login now
          </Link>
        </div>
      </form>
    </Form>
  );
}
