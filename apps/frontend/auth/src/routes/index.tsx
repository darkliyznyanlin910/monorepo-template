import { createFileRoute, redirect } from "@tanstack/react-router";

import { Button } from "@repo/ui/components/components.tsx";

import { env } from "~/env";
import { authClient } from "~/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = authClient.useSession();
  console.log(data?.session);
  return (
    <div>
      <p>Hello World {env.VITE_APP_URL}</p>
      {data?.session ? (
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => redirect({ to: "/sign-in" })}>
          Go to sign in
        </Button>
      )}
    </div>
  );
}
