import { serve } from "@hono/node-server";
import { getBaseUrl, SERVICES } from "@repo/service-discovery";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "~/auth";

const app = new Hono();

app.use(
  "/auth/*",
  cors({
    origin: SERVICES.map((service) => getBaseUrl(service)),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

serve({
  port: 3000,
  fetch: app.fetch,
});
