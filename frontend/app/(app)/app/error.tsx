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
    <div>
      <p>An error occured :(</p>
    </div>
  );
}

export default ErrorComponent;
