import { createAuthClient } from "better-auth/react";

import { getBaseUrl } from "@repo/service-discovery";

export const authClient = createAuthClient({
  baseURL: getBaseUrl("auth"),
  plugins: [],
});
