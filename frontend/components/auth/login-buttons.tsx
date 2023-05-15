"use client";

import GoogleLogo from "@images/google.svg";
import { IconBrandAmazon } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

function LoginButtons() {
  return (
    <>
      {/* AWS Cognito */}
      <Button
        variant="yellow"
        onClick={() =>
          signIn("cognito", {
            callbackUrl: "/app",
          })
        }
      >
        <IconBrandAmazon size={20} />
        Continue with AWS Cognito
      </Button>

      {/* Google */}
      <Button
        variant="outline"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/app",
          })
        }
      >
        <Image
          src={GoogleLogo}
          alt="Google logo"
          width={20}
          height={20}
          className="h-5 w-5"
        />
        Continue with Google
      </Button>
    </>
  );
}

export default LoginButtons;
