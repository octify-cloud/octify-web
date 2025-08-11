import { prisma } from "@/prisma/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization, twoFactor, admin } from "better-auth/plugins";

import axios from "axios";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies(), organization(), twoFactor(), admin()],
  secondaryStorage: {
    get: async (key) => {
      const val = await axios
        .get(
          `${process.env.APP_URL}/api/auth/redis?secret=${process.env.REDIS_SECRET}&key=${key}&action=get`,
          {
            timeout: 2000,
          },
        )
        .catch((e) => null);

      return val ? val.data.result : null;
    },
    set: async (key, value, ttl) => {
      await axios
        .get(
          `${process.env.APP_URL}/api/auth/redis?secret=${process.env.REDIS_SECRET}&key=${key}&value=${value}&ttl=${ttl}&action=set`,
          {
            timeout: 2000,
          },
        )
        .catch((e) => null);
    },
    delete: async (key) => {
      await axios
        .get(
          `${process.env.APP_URL}/api/auth/redis?secret=${process.env.REDIS_SECRET}&key=${key}&action=delete`,
          {
            timeout: 2000,
          },
        )
        .catch((e) => null);
    },
  },
});
