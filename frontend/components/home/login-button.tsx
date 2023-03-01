"use client";

import { Button } from "@ui/button";
import { ClientSafeProvider, signIn } from "next-auth/react";

function LoginButton({ id, callbackUrl }: ClientSafeProvider) {
  return (
    <Button
      onClick={() =>
        signIn(id, {
          callbackUrl: callbackUrl,
        })
      }
    >
      Login
    </Button>
  );
}

export default LoginButton;
