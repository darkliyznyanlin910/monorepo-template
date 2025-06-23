import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  extends: [],
  client: {
    VITE_DEPLOYMENT_ENVIRONMENT: z
      .enum(["local", "aws-prod", "aws-dev"])
      .default("local"),
    VITE_COGNITO_BASE_URL: z.string(),
    VITE_COGNITO_CLIENT_ID: z.string(),
  },
  clientPrefix: "VITE_",
  runtimeEnv: {
    VITE_DEPLOYMENT_ENVIRONMENT: import.meta.env.VITE_DEPLOYMENT_ENVIRONMENT,
    VITE_COGNITO_BASE_URL: import.meta.env.VITE_COGNITO_BASE_URL,
    VITE_COGNITO_CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID,
  },
  skipValidation: import.meta.env.npm_lifecycle_event === "lint",
});
