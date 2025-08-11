import { createAuthClient } from "better-auth/react";
import {
  organizationClient,
  twoFactorClient,
} from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.APP_URL,
  plugins: [organizationClient(), twoFactorClient()],
});
