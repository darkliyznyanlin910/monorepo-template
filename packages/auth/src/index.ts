import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  apiKey,
  bearer,
  jwt,
  oidcProvider,
  openAPI,
  organization,
} from "better-auth/plugins";
import { SocialProviders } from "better-auth/social-providers";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export function initAuth(
  DB: any,
  options: {
    baseDomain: string;
    baseUrl: string;
    secret: string | undefined;
    trustedOrigins?: string[];
    socialProviders?: SocialProviders;
    mailer?: nodemailer.Transporter<
      SMTPTransport.SentMessageInfo,
      SMTPTransport.Options
    >;
    getOrganizations: (userId: string) => Promise<string[]> | undefined;
  },
) {
  const config = {
    database: drizzleAdapter(DB, {
      provider: "pg",
      usePlural: true,
    }),

    baseURL: options.baseUrl,
    secret: options.secret,

    plugins: [
      apiKey(),
      bearer(),
      openAPI({
        path: "/docs",
      }),
      jwt({
        jwt: {
          audience: async ({ user }) => {
            return options.getOrganizations(user.id);
          },
        },
      }),
      organization(),
      oidcProvider({
        loginPage: "/sign-in",
      }),
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
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: options.baseDomain,
      },
    },
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
