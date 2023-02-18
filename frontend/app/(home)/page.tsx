import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Signout from "./Signout";

async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className="flex gap-x-3">
        {session ? (
          <>
            <Link href="/app">App</Link>
            <Signout />
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
      <main>
        <p>Main page</p>
      </main>
    </>
  );
}

export default Page;
