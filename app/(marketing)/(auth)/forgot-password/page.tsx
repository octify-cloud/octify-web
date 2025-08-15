import React from "react";
import SendResetPasswordForm from "./_components/send-email-form";

export default async function ResetPasswordPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <SendResetPasswordForm />
    </div>
  );
}
