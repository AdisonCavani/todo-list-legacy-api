"use client";

import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

function SignoutButton() {
  return (
    <button
      className="flex w-full items-center gap-x-3 rounded-lg px-3 py-[6px] hover:bg-neutral-200/40"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      <IconLogout size={20} className="text-neutral-500" />
      <p className="text-neutral-800">Sign out</p>
    </button>
  );
}

export default SignoutButton;
