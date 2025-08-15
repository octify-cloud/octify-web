import { createAuthClient } from "better-auth/react";
import {
  organizationClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { sooner } from "@/utils/sooner";
export const authClient = createAuthClient({
  baseURL: process.env.APP_URL,
  plugins: [organizationClient(), twoFactorClient()],
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        sooner.warning(
          `Rate limit exceeded. Retry after ${retryAfter} seconds`,
        );
      }
    },
  },
});
