import { initAuth } from "@repo/auth-common";
import { eq, inArray } from "@repo/db-auth";
import { db } from "@repo/db-auth/client";
import { members, organizations } from "@repo/db-auth/schema";
import { getBaseUrl, getTrustedOrigins } from "@repo/service-discovery";

import { env } from "~/env";
import { mailer } from "./mailer";

console.log(getTrustedOrigins(env.NODE_ENV));

export const auth = initAuth(db, {
  baseUrl: getBaseUrl(env.NODE_ENV, "auth") + "/auth",
  secret: env.AUTH_SECRET,
  trustedOrigins: getTrustedOrigins(env.NODE_ENV),
  mailer: mailer,
  getOrganizations: async (userId) => {
    const orgs = await db.query.members.findMany({
      where: eq(members.userId, userId),
    });
    const orgSlugs = await db.query.organizations.findMany({
      columns: {
        slug: true,
      },
      where: inArray(
        organizations.id,
        orgs.map((org) => org.organizationId),
      ),
    });
    return orgSlugs.map((org) => org.slug ?? "");
  },
});
