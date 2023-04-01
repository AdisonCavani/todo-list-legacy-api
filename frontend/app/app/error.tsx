"use client";

import { Button } from "@ui/button";
import { signOut } from "next-auth/react";
import type Error from "next/error";

type Props = {
  error: Error;
  reset: () => void;
};

// TODO: replace this with proper Next.js type
// @ts-expect-error
function ErrorComponent({ error, reset }: Props) {
  return (
    <div className="-mx-6 -my-8 flex h-full grow flex-col items-center justify-center bg-red-200 text-red-700">
      <p className="font-semibold">Oops!</p>
      <p>Something went wrong...</p>
      <Button
        color="destructive"
        size="xs"
        className="mt-5"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </div>
  );
}

export default ErrorComponent;
