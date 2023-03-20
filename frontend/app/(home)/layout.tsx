import Header from "@components/home/header";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <main className="pt-12">{children}</main>
    </>
  );
}

export default Layout;
