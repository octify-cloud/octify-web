import EmailVerification from "@/components/email-templates/verification-email-template";
import { resend } from "./resend";
import ResetPasswordEmail from "@/components/email-templates/password-reset-template";

export const sendVerificationEmail = async ({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) => {
  await resend.emails.send({
    from: "Octify <info@octify.cloud>",
    to: [email],
    subject: "Verify your email",
    react: EmailVerification({ url: `${url}` }),
  });
};
export const sendPasswordResetEmail = async ({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) => {
  await resend.emails.send({
    from: "Octify <info@octify.cloud>",
    to: [email],
    subject: "Reset your account password",
    react: ResetPasswordEmail({ url: `${url}` }),
  });
};
