"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

function LoginButton({ id, name, callbackUrl }: ClientSafeProvider) {
  return (
    <button
      onClick={() =>
        signIn(id, {
          callbackUrl: callbackUrl,
        })
      }
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
    >
      Sign in with {name}
    </button>
  );
}

export default LoginButton;
