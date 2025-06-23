import { getBaseUrl } from "@repo/service-discovery";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: getBaseUrl("auth") + "/auth",
  plugins: [],
});
