"use client";
import { authClient } from "@/lib/auth/auth-client";
import React from "react";

export default function useSession() {
  const { data } = authClient.useSession();
  return data;
}
