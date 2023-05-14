"use client";

import { useSearchParams } from "next/navigation";

function SessionExpired() {
  const searchParams = useSearchParams();
  const sessionExpired = searchParams.get("sessionExpired");

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        {sessionExpired !== "true" ? "Welcome back" : "Session expired"}
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-300">
        {sessionExpired !== "true"
          ? "Sign in to your account using OAuth2 providers"
          : "Sign in again using OAuth2 providers"}
      </p>
    </>
  );
}

export default SessionExpired;
