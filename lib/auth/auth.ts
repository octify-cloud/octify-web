import { prisma } from "@/prisma/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization, twoFactor, admin } from "better-auth/plugins";

import axios from "axios";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../resend/send-verification-email";
export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"],
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  rateLimit: {
    enabled: true,
    window: 10,
    max: 5,
    storage: "secondary-storage",
    modelName: "rateLimit",
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerificationEmail({ email: user.email, url, token });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    expiresIn: 24 * 60 * 60,
    sendOnSignIn: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  session: {
    cookieCache: {
      maxAge: 60 * 60 * 24 * 7,
    },
    expiresIn: 60 * 60 * 24,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ token, url, user }, request) {
      await sendPasswordResetEmail({ email: user.email, url, token });
    },
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
