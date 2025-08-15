"use client";
import { authClient } from "@/lib/auth/auth-client";

export default function useSession() {
  const { data } = authClient.useSession();
  return data;
}
