import Footer from "@components/home/footer";
import Header from "@components/home/header";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
