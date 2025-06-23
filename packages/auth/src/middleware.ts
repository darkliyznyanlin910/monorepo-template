import { createMiddleware } from "hono/factory";

import { authClient } from "./client";
import { Session } from "./index";

export const authMiddleware = createMiddleware<{
  Variables: {
    user: Session["user"];
    session: Session["session"];
  };
}>(async (c, next) => {
  const { data: session } = await authClient.getSession();
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("session", session.session);
  c.set("user", session.user);

  await next();
});
