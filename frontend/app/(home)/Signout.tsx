"use client";

import { signOut } from "next-auth/react";

function Signout() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export default Signout;
