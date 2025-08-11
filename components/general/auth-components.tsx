"use client";
import React from "react";
import useSession from "../hooks/use-session";

export function SignedIn({ children }: { children?: React.ReactNode }) {
  const session = useSession();
  if (!session) return null;
  return children;
}

export function SignedOut({ children }: { children?: React.ReactNode }) {
  const session = useSession();
  if (session) return null;
  return children;
}
