import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "~/lib/auth";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data?.user) {
      throw redirect({ to: "/sign-in", search: { redirect: "/" } });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
