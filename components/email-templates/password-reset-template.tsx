import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const ResetPasswordEmail = ({ url }: { url: string }) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password to regain access to your account</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white px-[32px] py-[40px]">
            <Section>
              <Heading className="mb-[32px] text-center text-[32px] font-bold text-gray-900">
                Reset Your Password
              </Heading>

              <Text className="mb-[24px] text-[16px] text-gray-700">
                Hello,
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                We received a request to reset your password. Click the button
                below to set up a new password for your account.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  href={url}
                  className="box-border rounded-[8px] bg-[#72e3ad] px-[32px] py-[16px] text-[16px] font-semibold text-white"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="mb-[24px] text-[14px] leading-[20px] text-gray-600">
                If the button doesn’t work, copy and paste this link into your
                browser:
              </Text>

              <Text className="mb-[32px] text-[14px] break-all text-[#72e3ad]">
                {url}
              </Text>

              <Text className="mb-[8px] text-[14px] text-gray-600">
                This password reset link will expire in 24 hours.
              </Text>

              <Text className="text-[14px] text-gray-600">
                If you didn’t request a password reset, you can safely ignore
                this email.
              </Text>
            </Section>

            <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
              <Text className="m-0 mb-[8px] text-center text-[12px] text-gray-500">
                © 2025 Your Octify. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
