import { initAuth } from "@repo/auth";
import { getBaseUrl, getTrustedOrigins } from "@repo/service-discovery";

import { env } from "~/env";

export const auth = initAuth({
  baseUrl: getBaseUrl("auth") + "/auth",
  secret: env.AUTH_SECRET,
  trustedOrigins: getTrustedOrigins(),
});
