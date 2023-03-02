"use client";

import { Button } from "@ui/button";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <Button
      onClick={() =>
        signIn("cognito", {
          callbackUrl: "/app",
        })
      }
    >
      Login
    </Button>
  );
}

export default LoginButton;
