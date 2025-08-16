import { serve } from "@hono/node-server";
import { Scalar } from "@scalar/hono-api-reference";

import { createApp } from "./factory";
import { helloRoute } from "./routes/hello";

const app = createApp()
  .doc("/openapi", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "analytics API",
    },
  })
  .get("/docs", Scalar({ url: "/openapi" }))
  .get("/health", (c) =>
    c.json({
      ok: true,
      service: "analytics",
      timestamp: new Date().toISOString(),
    }),
  )
  .get("/", (c) => c.json({ message: "Hello, world!" }))
  .route("/hello", helloRoute);

export { app };

serve({ port: 3001, fetch: app.fetch });

console.log("🚀 analytics running on http://localhost:3001");
