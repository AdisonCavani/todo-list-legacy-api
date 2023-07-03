"use client";

import GoogleLogo from "@images/google.svg";
import { Button } from "@ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

function LoginButtons() {
  return (
    <>
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
