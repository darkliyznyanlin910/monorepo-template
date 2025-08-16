import { getAuthClient } from "@repo/auth-common/client";

import { getEnv } from "./env";

console.log(getEnv());
export const authClient = getAuthClient(
  getEnv().NODE_ENV as "development" | "production",
);
