import { initAuth } from "@repo/auth-common";
import { getBaseUrl, getTrustedOrigins } from "@repo/service-discovery";

import { env } from "~/env";
import { mailer } from "./mailer";

export const auth = initAuth({
  baseUrl: getBaseUrl("auth") + "/auth",
  secret: env.AUTH_SECRET,
  trustedOrigins: getTrustedOrigins(),
  mailer: mailer,
});
