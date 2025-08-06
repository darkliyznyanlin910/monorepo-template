import { oidcClient, organizationClient } from "better-auth/client/plugins";
import { jwt } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

import { getBaseUrl } from "@repo/service-discovery";

export const getAuthClient = (ENV: "development" | "production") =>
  createAuthClient({
    baseURL: getBaseUrl(ENV, "auth") + "/auth",
    plugins: [jwt(), organizationClient(), oidcClient()],
  });
