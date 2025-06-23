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
  },
  runtimeEnvStrict: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
