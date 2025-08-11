"use client";
import React, { useTransition } from "react";
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
import { CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterForm() {
  const [loadingSignup, startSignup] = useTransition();
  const [loadingGithub, startGitubSignup] = useTransition();
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });
  const password = form.watch("password");
  const { conditions } = validatePassword(password ?? "");

  const handleLogin = (data: RegisterSchema) => {
    startSignup(async () => {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/",
      });
      if (res.error?.message) {
        sooner.error(res.error.message);
        return;
      }
    });
  };
  const handleGithubLogin = () => {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className={"flex flex-col gap-6"}
      >
        <div className="flex flex-col items-center gap-2 text-center">
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
            labelSide={
              <Link
                className="text-sm text-zinc-400 underline"
                href={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            }
          />
          <div className="rounded-md p-4 ring ring-zinc-200">
            <Label className="font-medium">Password strength</Label>
            <hr className="my-2.5" />
            <div className="flex flex-col gap-2">
              {passwordConditionNames.map((e, idx) => {
                const checked = conditions[e.key];
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center gap-1 text-sm select-none",
                      {
                        "text-primary": checked,
                        "text-destructive": !checked,
                      },
                    )}
                  >
                    {checked ? (
                      <CircleCheck className="w-5" />
                    ) : (
                      <CircleX className="w-5" />
                    )}
                    <span>{e.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

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
            onClick={handleGithubLogin}
            variant="outline"
            className="w-full"
          >
            <GithubSVG />
            GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Login now
          </Link>
        </div>
      </form>
    </Form>
  );
}
