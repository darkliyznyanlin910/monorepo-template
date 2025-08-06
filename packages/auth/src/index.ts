import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt, openAPI, organization } from "better-auth/plugins";
import { SocialProviders } from "better-auth/social-providers";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { db } from "@repo/db-auth/client";

export function initAuth(options: {
  baseUrl: string;
  secret: string | undefined;
  trustedOrigins?: string[];
  socialProviders?: SocialProviders;
  mailer?: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
}) {
  const config = {
    database: drizzleAdapter(db, {
      provider: "pg",
      usePlural: true,
    }),

    baseURL: options.baseUrl,
    secret: options.secret,

    plugins: [
      openAPI({
        path: "/docs",
      }),
      jwt(),
      organization(),
    ],

    onAPIError: {
      throw: true,
      onError: (error) => {
        console.error("Auth error:", error);
      },
    },
    trustedOrigins: options.trustedOrigins,

    emailAndPassword: {
      enabled: true,
    },

    // Reference: https://www.better-auth.com/docs/reference/options#user
    user: {
      additionalFields: {},
    },
    socialProviders: options.socialProviders,
    emailVerification: options.mailer
      ? {
          sendVerificationEmail: async ({ user, url, token }, request) => {
            await options.mailer?.sendMail({
              to: user.email,
              subject: "Verify your email address",
              text: `Click the link to verify your email: ${url}`,
            });
          },
        }
      : undefined,
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
