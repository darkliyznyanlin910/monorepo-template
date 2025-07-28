import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { getTrustedOrigins } from "@repo/service-discovery";

import { auth } from "~/auth";

const app = new Hono();

app
  .use(
    "/auth/*",
    cors({
      origin: getTrustedOrigins(),
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .get("/health", (c) =>
    c.json({
      ok: true,
      service: "auth-service",
      timestamp: new Date().toISOString(),
    }),
  )
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });

serve({
  port: 3000,
  fetch: app.fetch,
});

console.log("🚀 auth-service running on http://localhost:3000");
