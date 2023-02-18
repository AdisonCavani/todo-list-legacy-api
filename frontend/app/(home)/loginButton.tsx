"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

function LoginButton({ id, callbackUrl }: ClientSafeProvider) {
  return (
    <button
      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
      onClick={() =>
        signIn(id, {
          callbackUrl: callbackUrl,
        })
      }
    >
      Login
    </button>
  );
}

export default LoginButton;
