"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestPasswordResetSchema,
  requestPasswordResetSchema,
} from "@/types/schemas/client/reset-password.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/general/custom-form-field";
import { authClient } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { sooner } from "@/utils/sooner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function SendResetPasswordForm() {
  const [loading, startTrans] = useTransition();
  const [success, setSuccess] = useState(false);
  const form = useForm<RequestPasswordResetSchema>({
    resolver: zodResolver(requestPasswordResetSchema),
  });
  const handleResetPassword = (data: RequestPasswordResetSchema) => {
    startTrans(async () => {
      const res = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });
      if (res?.error?.message) {
        sooner.error(res.error.message);
        return;
      }
      setSuccess(true);
    });
  };
  return (
    <Card className="m-auto w-full max-w-lg">
      <CardHeader className="flex w-full items-center justify-between pb-0">
        <div>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription className="">
            Create a new password for your account
          </CardDescription>
        </div>
        <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
          <LockIcon className="text-primary h-6 w-6" />
        </div>
      </CardHeader>
      <hr />
      <CardContent className="pt-0">
        {success && (
          <Alert className="mb-4 border-yellow-500 bg-yellow-50 text-yellow-800">
            <MailIcon className="h-5 w-5" />
            <AlertTitle>Check Your Inbox</AlertTitle>
            <AlertDescription>
              We've sent you an email with instructions to reset your password.
              Please check your inbox and follow the link inside.
            </AlertDescription>
          </Alert>
        )}
        <Form {...form} disabled={loading || success}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleResetPassword)}
          >
            <CustomFormField
              name="email"
              label="Email"
              placeholder="m@example.com"
              inputType="email"
              control={form.control}
            />
            <Button className="mt-2 w-full" type="submit" loading={loading}>
              Send verification email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
