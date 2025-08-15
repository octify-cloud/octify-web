"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/types/schemas/client/reset-password.schema";
import CustomFormField from "@/components/general/custom-form-field";
import PasswordStrength from "@/components/general/password-strength";
import { useTransition } from "react";
import { authClient } from "@/lib/auth/auth-client";

import { sooner } from "@/utils/sooner";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [loading, startTrans] = useTransition();
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password = form.watch("password");
  function onSubmit(data: ResetPasswordSchema) {
    startTrans(async () => {
      const res = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });
      if (res.error?.message) {
        sooner.error(res.error.message);
        return;
      }
      window.location.href = "/login?password-reset=true";
    });
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <LockIcon className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form disabled={loading} {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField
                control={form.control}
                name="password"
                inputType="password"
                placeholder="********"
                label="Password"
              />
              <CustomFormField
                control={form.control}
                name="confirmPassword"
                inputType="password"
                placeholder="********"
                label="ConfirmPassword"
              />
              <PasswordStrength password={password} />
              <Button loading={loading} type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
