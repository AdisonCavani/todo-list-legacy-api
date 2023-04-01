"use client";

import { IconBrandAmazon } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <Button
      color="yellow"
      onClick={() =>
        signIn("cognito", {
          callbackUrl: "/app",
        })
      }
    >
      <IconBrandAmazon className="h-5 w-5" />
      AWS Cognito
    </Button>
  );
}

export default LoginButton;
