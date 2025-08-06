import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

import { env as dbAuthEnv } from "@repo/db-auth/env";
import { env as serviceDiscoveryEnv } from "@repo/service-discovery/env";

export const env = createEnv({
  extends: [dbAuthEnv, serviceDiscoveryEnv],
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().min(1),
    SMTP_SECURE: z.coerce.boolean(),
    SMTP_USER: z.string().min(1),
    SMTP_PASS: z.string().min(1),
    SMTP_FROM: z.string().min(1),
  },
  runtimeEnvStrict: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
