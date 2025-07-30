import { organizationClient } from "better-auth/client/plugins";
import { jwt } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

import { getBaseUrl } from "@repo/service-discovery";

export const authClient = createAuthClient({
  baseURL: getBaseUrl("auth") + "/auth",
  plugins: [jwt(), organizationClient()],
});
