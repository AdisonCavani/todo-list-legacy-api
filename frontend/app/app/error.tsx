"use client";

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
    </div>
  );
}

export default ErrorComponent;
