import { hashPassword } from "better-auth/crypto";
import { eq, inArray } from "drizzle-orm";

import { initAuth } from "@repo/auth-common";

import { db } from "../src/client";
import {
  accounts,
  members,
  oauthApplications,
  organizations,
  users,
} from "../src/schema";

export const auth = initAuth(db, {
  baseUrl: "http://localhost:3000/auth",
  secret: process.env.AUTH_SECRET,
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
  baseDomain: "localhost",
});

await db.transaction(async (tx) => {
  await tx
    .insert(users)
    .values({
      id: "admin",
      name: "Admin",
      email: "admin@test.com",
      emailVerified: true,
    })
    .onConflictDoNothing();
  await tx
    .insert(accounts)
    .values({
      id: "admin",
      accountId: "admin",
      userId: "admin",
      providerId: "credential",
      password: await hashPassword("password"),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing();
});

const res = await auth.api.signInEmail({
  body: {
    email: "admin@test.com",
    password: "password",
  },
});

const headers = new Headers({ Authorization: `Bearer ${res.token}` });

try {
  await auth.api.checkOrganizationSlug({
    headers,
    body: {
      slug: "admin-org",
    },
  });
  console.log("Organization not found, creating...");
  await auth.api.createOrganization({
    headers,
    body: {
      name: "Admin Org",
      slug: "admin-org",
    },
  });
} catch (e) {
  console.log("Organization already exists, skipping...");
}

await db
  .insert(oauthApplications)
  .values({
    id: "nS3fF8G3CXnkgxuMxTdPQonqrp0hzmZ2",
    name: "ArgoCD",
    // DO NOT CHANGE THESE VALUES for the ArgoCD application to work
    clientId: "EOfMkngqCQmPeaaIQjrwHQHNIUyjPOdS",
    clientSecret: "VvrMhfMJBjDHMDWNTetIQGkNykfrmPfb",
    redirectURLs: "http://argocd.127.0.0.1.nip.io/auth/callback",
    type: "web",
    disabled: false,
    userId: "admin",
  })
  .onConflictDoNothing();

process.exit(0);
