import React from "react";
import ResetPasswordForm from "./_components/reset-password-form";

import { prisma } from "@/prisma/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 px-2 text-center">
      <div>
        <h2 className="text-5xl font-bold">404</h2>
        <p className="mt-1 text-zinc-500">
          This verification link is invalid — it may have expired, been used
          already, or does not exist.
        </p>
      </div>
      <Link href={"/"} className="mt-2">
        <Button>Home page</Button>
      </Link>
    </div>
  );
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) return <NotFound />;
  const verification = await prisma.verification.findFirst({
    where: {
      identifier: `reset-password:${token}`,
      expiresAt: {
        gte: new Date(),
      },
    },
  });
  if (!verification) {
    return <NotFound />;
  }
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <ResetPasswordForm token={token} />
    </div>
  );
}
