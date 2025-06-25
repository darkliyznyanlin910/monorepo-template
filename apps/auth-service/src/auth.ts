import { initAuth } from "@repo/auth";
import { getBaseUrl } from "@repo/service-discovery";

import { env } from "~/env";

export const auth = initAuth({
  baseUrl: getBaseUrl("auth") + "/auth",
  secret: env.AUTH_SECRET,
});
