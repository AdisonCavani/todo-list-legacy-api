"use client";

import { IconBrandAmazon } from "@tabler/icons-react";
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
      className="bg-yellow-300 text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:bg-yellow-400 hover:active:bg-yellow-500"
    >
      <IconBrandAmazon className="h-5 w-5" />
      AWS Cognito
    </Button>
  );
}

export default LoginButton;
