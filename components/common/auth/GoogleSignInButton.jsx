import { signIn } from "@/auth";

import { Button } from "@/components/ui/button";

export default function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="flex w-full gap-x-4">
        Login with Google
      </Button>
    </form>
  );
}
