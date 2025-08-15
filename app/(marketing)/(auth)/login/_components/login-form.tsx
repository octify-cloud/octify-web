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
import { LoginSchema, loginSchema } from "@/types/schemas/client/login.schema";
import { authClient } from "@/lib/auth/auth-client";

import { sooner } from "@/utils/sooner";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const emailVerified = searchParams.get("email-verified") == "true";
  const passwordReset = searchParams.get("password-reset") == "true";

  const [loading, startTrans] = useTransition();
  const [loadingGithub, startGitubSignup] = useTransition();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin = (data: LoginSchema) => {
    startTrans(async () => {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.remember ?? false,
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
        <div className="flex flex-col items-center gap-1 text-center">
          <img className="mb-3 w-[90px]" src={"/assets/general/logo.png"} />
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        {emailVerified && (
          <Alert className="border-green-500 bg-green-50 text-green-800">
            <CheckCircle2Icon className="h-5 w-5" />
            <AlertTitle>Email Activated!</AlertTitle>
            <AlertDescription>
              Your email has been successfully verified.
            </AlertDescription>
          </Alert>
        )}
        {passwordReset && (
          <Alert className="border-green-500 bg-green-50 text-green-800">
            <CheckCircle2Icon className="h-5 w-5" />
            <AlertTitle>Password Reset Successful!</AlertTitle>
            <AlertDescription>
              Your password has been updated. You can now log in with your new
              credentials.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
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

          <CustomFormField
            name="remember"
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            label="Remember me for 6 hours."
          />

          <Button loading={loading} type="submit" className="w-full">
            Login
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
            Login with GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
